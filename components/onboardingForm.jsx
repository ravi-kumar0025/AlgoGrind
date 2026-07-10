"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiUser, FiArrowRight, FiCamera, FiLoader } from "react-icons/fi";

export default function OnboardingForm({
    username,
    setUsername,
    avatar,
    setAvatar,
    onSubmit,
    isLoading = false,
}) {
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        // Allow empty username — page will auto-generate one
        setError("");
        onSubmit(e);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
        >
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-zinc-900">
                    Complete Profile
                </h1>
                <p className="mt-2 text-lg text-zinc-600">
                    Choose a username and avatar to get started.
                </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>

                {/* Avatar Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">
                        Avatar
                    </label>

                    <label className="group flex items-center gap-5 cursor-pointer p-4 rounded-2xl border border-zinc-200 hover:border-indigo-400 bg-white transition-all duration-200">
                        {/* Avatar preview */}
                        <div className="relative shrink-0">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="avatar preview"
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
                            <p className="text-sm font-medium text-zinc-700">
                                {avatar ? "Change avatar" : "Upload a profile photo"}
                            </p>
                            <p className="text-xs text-zinc-400 mt-0.5">
                                PNG, JPG up to 5MB. Optional — you can change it later.
                            </p>
                        </div>

                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setAvatar(URL.createObjectURL(file));
                            }}
                        />
                    </label>
                </div>

                {/* Username */}
                <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">
                        Username
                    </label>
                    <div className="relative">
                        <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
                        <Input
                            id="username"
                            value={username}
                            placeholder="codeforces_ton"
                            onChange={(e) => setUsername(e.target.value.toLowerCase())}
                            className="h-14 pl-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                        />
                    </div>
                    <p className="text-xs text-zinc-400">
                        Leave blank to get a random one. This is your public handle.
                    </p>
                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}
                </div>

                {/* Submit */}
                <motion.div whileHover={{ scale: isLoading ? 1 : 1.015 }} whileTap={{ scale: isLoading ? 1 : 0.985 }}>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-14 w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
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
