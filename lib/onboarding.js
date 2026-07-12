"use server";

import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import User from "@/models/user.models";

export async function getCurrentUserOnboardingState() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return {
            session: null,
            profile: null,
        };
    }

    await connectDB();

    const profile = await User.findOne({
        userId: session.user.id,
    }).lean();

    return {
        session,
        profile,
    };
}
