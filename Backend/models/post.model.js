import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
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
        department: {
            type: String,
            required: true
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
        imageUrl: {
            type: String,
            required: true
        },
        // Only store Cloudinary public_id
        imagePublicId: {
            type: String,
            required: true,
        },

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

export default mongoose.model("Post", postSchema);


// in frontend
/*
import { useEffect, useState } from "react";

const PostImage = ({ publicId }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const baseURL = "https://res.cloudinary.com/dj9l2gzor/image/upload";

  const mobileURL = `${baseURL}/w_400,h_300,c_fill/${publicId}.jpg`;
  const desktopURL = `${baseURL}/w_900,h_600,c_fill/${publicId}.jpg`;

  return (
    <img
      src={isMobile ? mobileURL : desktopURL}
      alt="Post"
      style={{ width: "100%", borderRadius: "10px" }}
    />
  );
};

export default PostImage;


use it <PostImage publicId={post.imagePublicId} />


// convert file → base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

// usage
const base64Image = await toBase64(selectedFile);

const res = await fetch("/api/posts/create", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    title,
    description,
    category,
    department,
    image: base64Image, // 🔥 send base64 string
  }),
});


*/