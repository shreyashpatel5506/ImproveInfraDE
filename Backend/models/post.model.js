import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },

    description: { type: String, required: true },

    department: { type: String, required: true },

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

    /** 🔥 New Field: location */
    location: {
      type: String,
      required: true,
    },

    /** 🔥 New Field: priority — only officer can assign */
    priority: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      default: "Low",
    },

    imageUrl: { type: String, required: true },

    imagePublicId: { type: String, required: true },

    likesCount: { type: Number, default: 0 },

    comments: [
      {
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    commentsCount: { type: Number, default: 0 },

    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Post", postSchema);
