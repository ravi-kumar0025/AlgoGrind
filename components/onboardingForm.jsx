"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { completeOnboarding } from "@/modules/auth/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiUser, FiArrowRight, FiCamera, FiLoader } from "react-icons/fi";

export default function Onboarding() {
    const [username, setUsername] = useState("");
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const finalUsername = username.trim();

        if (!finalUsername) {
            const message = "Username is required";
            setErrorMessage(message);
            return;
        }

        try {
            setIsLoading(true);
            setErrorMessage("");

            const result = await completeOnboarding({
                username: finalUsername,
                avatar: avatarFile || "",
            });

            if (!result.success) {
                const message = result.message || "Onboarding failed";
                setErrorMessage(message);
                return;
            }

            toast.success("Profile created! Welcome to AlgoGrind");

            setTimeout(() => {
                router.replace("/dashboard");
            }, 1000);
        } catch (err) {
            console.error(err);
            const message = err?.message || "Something went wrong during onboarding.";
            setErrorMessage(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
        >
            <div>
                <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
                    Complete Profile
                </h1>

                <p className="mt-3 text-xl text-zinc-600">
                    Choose a username and avatar to get started.
                </p>
            </div>

            {errorMessage ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-base text-red-700">
                    {errorMessage}
                </div>
            ) : null}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="text-base font-semibold tracking-widest uppercase text-zinc-500">
                        Avatar
                    </label>

                    <label className="group flex items-center gap-5 cursor-pointer p-4 rounded-2xl border border-zinc-200 hover:border-indigo-400 bg-white transition-all duration-200">
                        <div className="relative shrink-0">
                            {avatarPreview ? (
                                <Image
                                    src={avatarPreview}
                                    alt="avatar preview"
                                    width={64}
                                    height={64}
                                    className="w-16 h-16 rounded-full object-cover border-2 border-indigo-200"
                                />
                            ) : (
                                <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 border-2 border-dashed border-zinc-300 group-hover:border-indigo-300 transition-colors">
                                    <FiUser size={24} />
                                </div>
                            )}

                            <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow">
                                <FiCamera size={12} className="text-white" />
                            </span>
                        </div>

                        <div className="flex-1 min-w-0">
                            <p className="text-base font-medium text-zinc-700">
                                {avatarFile ? "Change avatar" : "Upload a profile photo"}
                            </p>

                            <p className="text-sm text-zinc-400 mt-0.5">
                                PNG, JPG up to 5MB. 
                            </p>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                setAvatarFile(file);
                                setAvatarPreview(URL.createObjectURL(file));
                            }}
                        />
                    </label>
                </div>

                <div className="space-y-2">
                    <label className="text-base font-semibold tracking-widest uppercase text-zinc-500">
                        Username
                    </label>

                    <div className="relative">
                        <FiUser
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            size={20}
                        />

                        <Input
                            id="username"
                            value={username}
                            placeholder="hey, codie"
                            required
                            onChange={(e) =>
                                setUsername(e.target.value.toLowerCase())
                            }
                            className="h-14 pl-12 text-lg rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                        />
                    </div>
                </div>

                <motion.div
                    whileHover={{
                        scale: isLoading ? 1 : 1.015,
                    }}
                    whileTap={{
                        scale: isLoading ? 1 : 0.985,
                    }}
                >
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-14 w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xl rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <>
                                <FiLoader size={20} className="animate-spin" />
                                Setting up your profile...
                            </>
                        ) : (
                            <>
                                Continue to Dashboard
                                <FiArrowRight size={22} />
                            </>
                        )}
                    </Button>
                </motion.div>
            </form>
        </motion.div>
    );
}
