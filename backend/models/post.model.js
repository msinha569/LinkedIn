import mongoose, { Schema } from "mongoose";


const postSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    comments: [{
       content: {type: String},
       user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
       createdAt: {type: Date, default: Date.now}
    }]
},{
    timestamps: true
})

export const Post = mongoose.model("Post",postSchema)