import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    birth_date: {
        type: Date,
        required: true,
    },
    biography: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    picture: {
        type: String,
        trim: true,
        default: ''
    },
    cover_picture: {
        type: String,
        trim: true,
        default: ''
    },
    followers: {
        type: Number,
        default: 0
    },
    following: {
        type: Number,
        default: 0
    },
    contacts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tags: [
        {
            name: {
                type: String,
                ref: 'Tag'
            },
            score: {
                type: Number,
                default: 0
            }
        },
    ],
    status_connection: {
        type: String,
        enum: ['connected', 'disconnected'],
        default: 'connected'
    },
    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }
}, {
    timestamps: true
})

export default mongoose.model("User", userSchema) 