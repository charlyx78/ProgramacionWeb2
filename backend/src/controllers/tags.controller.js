import Tag from "../models/tag.model.js"

export const createTag = async(tag) => {
    const {
        name
    } = tag

    try {
        const tagFound = await Tag.findOne({ name })
        if(tagFound) return ({
            message: "Tag already exists"
        })

        const newTag = new Tag({
            name,
        })

        const tagSaved = await newTag.save()

        return ({
            message: "Tag created successfully",
            tag: {
                id: tagSaved._id,
                name: tagSaved.name
            }
        })
    } catch (error) {
        return ({ message: error.message }) 
    }
}