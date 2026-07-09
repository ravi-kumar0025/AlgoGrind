import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },

        username: {
            type: String,
            trim: true,
            unique: true,
            sparse: true,
        },

        displayName: {
            type: String,
            trim: true,
        },

        avatar: {
            type: String,
            default: "",
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        streak: {
            type: Number,
            default: 0,
        },

        problemsSolved: {
            type: Number,
            default: 0,
        },

        contestRating: {
            type: Number,
            default: 0,
        },

        githubUsername: {
            type: String,
            default: "",
        },

        isOnboarded: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Profile ||
    mongoose.model("Profile", profileSchema);