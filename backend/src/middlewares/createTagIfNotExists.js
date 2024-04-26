import { createTag } from "../controllers/tags.controller.js"

export const createTagIfNotExists = async(req, res, next) => {
    try {
        const tags = req.body.tags
        if (tags && tags.length > 0) {
            for (const tag of tags) {
                await createTag(tag);
            }
        }
        next()
    } catch (error) {
        // console.log(error)
        return res.status(400).json({ message: "Error while creating user tags" })
    }
}