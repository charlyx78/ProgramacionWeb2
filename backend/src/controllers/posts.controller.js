import Post from "../models/post.model.js"

export const getPosts = async (req, res) => {

}

export const createPost = async (req, res) => {
    const {
        content,
        attachment,
        user,
        parent,
        tags
    } = req.body
    try {
        const newPost = new Post({
            content,
            attachment,
            user,
            parent,
            tags
        })

        await newPost.save()

        res.status(200).json({ 
            message: "Post created successfully",
         })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const replyPost = async (req, res) => {
    const {
        content,
        attachment,
        user,
        parent,
        tags
    } = req.body

    try {
        const parentPost = req.params.id

        const newReply = new Post({
            content,
            attachment,
            user,
            parent: parentPost,
            tags
        })

        await newReply.save()

        res.status(200).json({ 
            message: "Post replied successfully",
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

        res.status(201).json({ 
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
    
        res.status(200).json({ 
            message: "Post deleted successfully"
         })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}