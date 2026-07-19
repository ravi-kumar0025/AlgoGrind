"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user.models";
import uploadOnCloudinary from "@/utils/upload-on-cloudinary";

export async function completeOnboarding({
    username,
    avatar,
}) {
    try {
        if (!username?.trim()) {
            return {
                success: false,
                message: "Username is required",
            };
        }

        await connectDB();

        const session =
            await auth.api.getSession({
                headers: await headers(),
            });

        if (!session?.user) {
            return {
                success: false,
                message: "Unauthorized",
            };
        }

        const existingUser =
            await User.findOne({
                username: username
                    .trim()
                    .toLowerCase(),
            });

        if (existingUser) {
            return {
                success: false,
                message:
                    "Username already taken",
            };
        }

        let avatarUrl = "";

        if (avatar && avatar.size > 0) {
            const uploaded = await uploadOnCloudinary(avatar);
            avatarUrl = uploaded.secure_url;
        }
        await User.create({
            userId: session.user.id,
            username: username.trim().toLowerCase(),
            avatar: avatarUrl,
            role: "user",
            onboardingCompleted: true,
            email:session.user.email,
        });

        return {
            success: true,
            message:
                "Profile created successfully",
        };
    } catch (error) {
        console.error(
            "ONBOARDING ERROR:",error
        );

        return {
            success: false,
            message:
                "Failed to complete onboarding",
        };
    }
}