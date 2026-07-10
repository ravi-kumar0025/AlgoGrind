"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user.models";

export async function completeOnboarding({ username, avatar }) {
    console.log("\n========== ONBOARDING STARTED ==========");
    console.log("📥 Received payload:", { username, avatar: avatar || "(none)" });

    try {
        await connectDB();
        console.log("✅ DB connected");

        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            console.warn("🚫 No session found — unauthorized");
            return { success: false, message: "Unauthorized" };
        }

        console.log("👤 Session user:", {
            id: session.user.id,
            email: session.user.email,
            name: session.user.name,
        });

        // Check username collision
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            console.warn(`⚠️  Username "${username}" is already taken`);
            return { success: false, message: "Username already taken" };
        }
        console.log(`✅ Username "${username}" is available`);

        // Check if profile already exists for this user
        const existingUser = await User.findOne({ userId: session.user.id });
        if (existingUser) {
            console.warn("⚠️  Profile already exists for userId:", session.user.id);
            return { success: false, message: "Profile already exists" };
        }

        // Create the profile
        const newUser = await User.create({
            userId: session.user.id,
            username,
            avatar: avatar || "",
            role: "user",
            onboardingCompleted: true,
        });

        console.log("🎉 Profile created successfully:", {
            _id: newUser._id,
            userId: newUser.userId,
            username: newUser.username,
            avatar: newUser.avatar || "(none)",
            role: newUser.role,
            onboardingCompleted: newUser.onboardingCompleted,
            createdAt: newUser.createdAt,
        });
        console.log("========== ONBOARDING COMPLETE ==========\n");

        return { success: true, message: "Profile created" };

    } catch (error) {
        console.error("❌ Onboarding error:", error);
        return { success: false, message: "Something went wrong" };
    }
}