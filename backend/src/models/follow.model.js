import mongoose from "mongoose"

const followSchema = new mongoose.Schema({
    follow: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})

export default mongoose.model("Follow", followSchema);