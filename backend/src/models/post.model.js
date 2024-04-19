import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        maxlength: 1000
    },
    attachment: {
        type: String,
        default: null
    }, 
    likes: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
        default: null
    },
    tags: [{
        type: String,
        maxlength: 50,
        default: null
    }],
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
});

export default mongoose.model("Post", postSchema);
