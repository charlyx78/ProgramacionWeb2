import Tag from "../models/tag.model.js"

export const createTag = async(tag) => {
    try {        
        const {
            name
        } = tag

        console.log(tag)

        const tagFound = await Tag.findOne({ name })
        if(tagFound) return ({
            message: "Tag already exists"
        })

        const newTag = new Tag({
            name: name,
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