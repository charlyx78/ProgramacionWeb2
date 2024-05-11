import Post from "../models/post.model.js"
import Like from "../models/like.model.js"

export const updateLikeCount = async(req, res, next) => {
    try {
        const findLike = await Like.find({
            post: req.params.id,
            user: req.user.id
        })

        if(findLike.length > 0) {
            await Post.findOneAndUpdate(
                { _id: req.params.id },
                { $inc: { likes: -1 } },
                { new: true }
            )

            await Like.findOneAndDelete({
                post: req.params.id,
                user: req.user.id
            })

            return res.status(400).json({ message: "User already liked this post. Like has been removed" })
        }
             
        const updatedPost = await Post.findOneAndUpdate(
            { _id: req.params.id }, 
            { $inc: { likes: 1 } },
            { new: true } 
        );

        if (!updatedPost) {
           return res.status(404).json({message: "Post not found"})
        }

        next()
    } catch (error) {

        return res.status(500).json({message: "Internal server error: " + error})
    }
}