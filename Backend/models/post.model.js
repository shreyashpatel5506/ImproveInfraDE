import mongoose from "mongoose";

const post = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: String,
            enum: ["Roads & Traffic", "Water", "Electricity", "Garbage", "Emergency", "Other"],
            default: "Other",
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Resolved"],
            default: "Pending",
        },

        image: {
            type: String,
        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Officer",
            required: true,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        likesCount: {
            type: Number,
            default: 0,
        },

        comments: [
            {
                user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
                text: { type: String, required: true },
                createdAt: { type: Date, default: Date.now },
            },
        ],

        commentsCount: {
            type: Number,
            default: 0,
        },

        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Post", post);
