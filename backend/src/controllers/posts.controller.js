import Post from "../models/post.model.js"

export const getPosts = async (req, res) => {
    const posts = await Post.find()

    if(!posts) return res.status(404).json({message: "Posts not found"})

    res.status(200).json({
        posts: posts
    })
}

export const createPost = async (req, res) => {
    const {
        content,
        attachment,
        parent,
        tags,
    } = req.body

    try {
        const newPost = new Post({
            content,
            attachment: req.body.attachment.name,
            parent,
            tags,
            user: req.user.id
        })      

        const postSaved = await newPost.save()

        res.status(201).json({ 
            message: "Post created successfully",
            post: {
                id: postSaved._id
            }
         })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const replyPost = async (req, res) => {
    const {
        content,
        attachment,
        tags
    } = req.body

    try {
        const parentPost = req.params.id

        const newReply = new Post({
            content,
            attachment,
            parent: parentPost,
            tags,
            user: req.user.id
        })

        const replySaved = await newReply.save()

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

export const getPost = async (req, res) => {
    try {
        const postId = req.params.id

        const post = await Post.findById(postId)

        if(!post) return res.status(404).json({
            message: "Post not found"
        })

        res.status(200).json({ 
            id: post.id,
            content: post.content,
            attachment: post.attachment,
            likes: post.likes,
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

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id
    
        const post = await Post.findOneAndUpdate(
            { _id: postId },
            { status: "inactive" },  
            { new: true }
        )   
    
        if(!post) return res.status(404).json({
            message: "Post not found"
        })
    
        res.status(204).json({ 
            message: "Post deleted successfully"
         })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}