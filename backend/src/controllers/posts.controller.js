import Post from "../models/post.model.js"
import Like from "../models/like.model.js"
import { io } from "../index.js"
import User from "../models/user.model.js"
import Follow from "../models/follow.model.js"
import moment from 'moment'

const twoDaysAgo = moment().subtract(3, 'days')

/** Obtener posts del feed con los tags preferidos del usuario */
export const getTagsPosts = async(req, res) => {
    try {
        const userTags = await User.findById(req.user.id).select('tags')
        
        const posts = await Post.find({
            tags: { $elemMatch: { name: { $in: userTags.tags.map(tag => tag.name) } } },
            parent: null,
        })
        .sort({ createdAt: -1 })
        .populate('user')
    
        if (!posts) return res.status(404).json({ message: "Posts not found" })
    
        res.status(200).json({
            posts: posts
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/** Obtener posts de los seguidos en el feed */
export const getFollowPosts = async(req, res) => {
    try {
        const usersFollowed = await Follow.find({ user: req.user.id  }).select('follow')

        const followedUserIds = usersFollowed.map(user => user.follow);

        const posts = await Post.find({
            user: { $in: followedUserIds },
            parent: null,
        })
        .sort({ createdAt: -1 })
        .populate('user')
    
        if (!posts) return res.status(404).json({ message: "Posts not found" })
    
        res.status(200).json({
            posts: posts,
            usersFollowed,
            followedUserIds
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProfilePosts = async(req, res) => {
    try {
        const posts = await Post.find(
            {
                user: req.params.id,
                parent: null
            }
        ).sort({ createdAt: -1 }).populate('user')
        
        if(!posts) return res.status(404).json({ message: "Posts not found" })

        res.status(200).json({
            posts
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

/** Crear post */
export const createPost = async (req, res) => {
    const {
        content,
        attachment,
        attachmentType,
        tags
    } = req.body

    try {
        const newPost = new Post({
            content,
            attachment: req.file ? req.file.path : '',
            attachmentType: req.file ? req.file.mimetype : '',
            tags,
            user: req.user.id
        })

        const postSaved = await newPost.save()

        const posts = await Post.find().sort({ createdAt: -1 })
        io.emit('create-post', posts)

        res.status(201).json({
            message: "Post created successfully",
            post: {
                id: postSaved._id,
                content: postSaved.content,
                attachment: postSaved.attachment
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/** Crear respuesta */
export const replyPost = async (req, res) => {
    const {
        content,
        attachment,
        attachmentType,
        tags
    } = req.body

    try {
        const newReply = new Post({
            content,
            attachment: req.file ? req.file.path : '',
            attachmentType: req.file ? req.file.mimetype : '',
            parent: req.params.id,
            tags,
            user: req.user.id
        })

        const replySaved = await newReply.save()

        await Post.findOneAndUpdate(
            { _id: req.params.id },
            { $inc: { comments: 1 } },
            { new: true }
        )

        const posts = await Post.find({ parent: req.params.id }).sort({ createdAt: 1 }).populate('user')
        io.emit(`reply-post-${req.params.id}`, posts) 

        const post = await Post.findById(req.params.id).sort({ createdAt: -1 }).populate('user')
        io.emit(`add-comment-${req.params.id}`, post) 

        res.status(201).json({
            message: "Post replied successfully",
            reply: {
                id: replySaved._id
            },
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


/** Obtener post por su id */
export const getPost = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findById(postId).populate('user')

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        res.status(200).json({
            _id: post.id,
            content: post.content,
            attachment: post.attachment,
            attachmentType: post.attachmentType,
            likes: post.likes,
            comments: post.comments,
            user: post.user,
            parent: post.parent,
            tags: post.tags,
            status: post.status,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updatePost = async (req, res) => {
}

/** Eliminar post */
export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { status: "inactive" },
            { new: true }
        )

        if (!post) return res.status(404).json({
            message: "Post not found"
        })

        res.status(204).json({
            message: "Post deleted successfully"
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/** Saber si el post tiene like */
export const hasLike = async(req, res) => {
    try {
        const findLike = await Like.find({
            post: req.params.id,
            user: req.user.id
        })

        if (findLike.length == 0) {
            res.status(200).json({message: false})
        } else {
            res.status(200).json({message: true})
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/** Dar like a post */
export const addLike = async (req, res) => {
    try {
        const findLike = await Like.find({
            post: req.params.id,
            user: req.user.id
        })

        if (findLike.length == 0) {
            const newLike = new Like({
                post: req.params.id,
                user: req.user.id
            })

            const likeSaved = await newLike.save()

            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: 1 } },
                { new: true }
            )

            const post = await Post.findById(req.params.id).sort({ createdAt: -1 }).populate('user')
            io.emit(`add-like-${req.params.id}`, post) 

            res.status(201).json({
                message: "Like registrated successfully"
            })
        }
        else {
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: -1 } },
                { new: true }
            )

            await Like.findOneAndDelete({
                post: req.params.id,
                user: req.user.id
            })

            const post = await Post.findById(req.params.id).sort({ createdAt: -1 }).populate('user')
            io.emit(`add-like-${req.params.id}`, post) 

            res.status(200).json({
                message: "Like removed successfully"
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

/** Obtener respuestas de un post */
export const getReplies = async (req, res) => {
    try {
        const parentId = req.params.id

        const posts = await Post.find({ parent: parentId }).sort({ createdAt: 1 }).populate('user')

        if (!posts) return res.status(404).json({ message: "Posts not found" })

        res.status(200).json({
            posts: posts
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}