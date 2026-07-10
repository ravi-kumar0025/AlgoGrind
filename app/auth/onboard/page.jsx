"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OnboardingForm from "@/components/onboardingForm";
import { completeOnboarding } from "@/modules/auth/actions";
import { useSession } from "@/lib/auth-client";

// Generates a random 6-char alphanumeric suffix: e.g. "k9xm2p"
function randomSuffix() {
    return Math.random().toString(36).slice(2, 8);
}

export default function OnboardingPage() {
    const [username, setUsername] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // If username is empty, generate one from session name + random suffix
        const finalUsername = username.trim()
            ? username.trim()
            : `${(session?.user?.name || "user").toLowerCase().replace(/\s+/g, "_")}_${randomSuffix()}`;

        console.log("🚀 [CLIENT] Onboarding submit:", {
            username: finalUsername,
            avatar: avatar || "(none)",
            sessionUser: session?.user ?? "no session yet",
        });

        try {
            setIsLoading(true);

            const result = await completeOnboarding({
                username: finalUsername,
                avatar: avatar || "",
            });

            console.log("📦 [CLIENT] Server action result:", result);

            if (!result.success) {
                toast.error(result.message || "Onboarding failed");
                return;
            }

            toast.success("Profile created! Welcome to AlgoGrind 🎉");

            // Short delay so toast is visible before navigation
            setTimeout(() => {
                router.push("/dashboard");
            }, 1000);

        } catch (err) {
            console.error("❌ [CLIENT] Onboarding error:", err);
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <OnboardingForm
            username={username}
            setUsername={setUsername}
            avatar={avatar}
            setAvatar={setAvatar}
            onSubmit={handleSubmit}
            isLoading={isLoading}
        />
    );
}