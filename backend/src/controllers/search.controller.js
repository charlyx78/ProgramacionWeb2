import User from "../models/user.model.js"
import Post from "../models/post.model.js"

export const searchUser = async(req, res) => {
    const {
        searchInput
    } = req.body
    try {
        const searchResult = await User.find({
            $or: [
              { username: { $regex: searchInput, $options: 'i' } },
              { $expr: { $regexMatch: { input: { $concat: ["$name", " ", "$last_name"] }, regex: searchInput, options: 'i' } } }
            ]
        }).sort({ followers: -1 }).limit(10)

        console.log(searchResult)

        if (!searchResult) return res.status(404).json({message: "Results not found for this search"})

        res.status(200).json(searchResult)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const searchPost = async(req, res) => {
    const {
        searchInput
    } = req.body

    try {
        const searchResult = await Post.find({
            content: { $regex: searchInput, $options: 'i' },
            status: 'active'
        }).populate('user').limit(10).sort({ likes: -1 })

        if (!searchResult) return res.status(404).json({message: "Posts not found for this search"})

        res.status(200).json(searchResult)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}