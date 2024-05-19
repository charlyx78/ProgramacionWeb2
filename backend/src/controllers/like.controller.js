import Like from "../models/like.model.js"

export const like = async(req, res) => {
    try {
        const newLike = new Like({
            post: req.params.id,
            user: req.user.id
        })

        const likeSaved = await newLike.save()

        res.status(201).json({
            message: "Like registrated successfully",
            like: {
                post: likeSaved.post,
                user: likeSaved.user
            }
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}