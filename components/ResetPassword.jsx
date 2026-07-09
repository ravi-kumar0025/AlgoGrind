"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiLock, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1400));

        setIsSuccess(true);
        setIsLoading(false);

        setTimeout(() => {
            window.location.href = "/auth/login";
        }, 2000);
    };

    return (
        <div className="w-full max-w-md">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-10 transition-colors">
                ← Back to Login
            </Link>

            <AnimatePresence mode="wait">
                {!isSuccess ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-zinc-900">Reset Password</h1>
                            <p className="mt-3 text-lg text-zinc-600">
                                Create a new strong password for your account.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">NEW PASSWORD</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-4 text-zinc-400" size={20} />
                                    <Input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-14 pl-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">CONFIRM NEW PASSWORD</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-4 text-zinc-400" size={20} />
                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-14 pl-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !password || !confirmPassword}
                                    className="h-14 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md"
                                >
                                    {isLoading ? "Updating Password..." : "Reset Password"}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-20 text-center"
                    >
                        <FiCheckCircle className="text-emerald-500 mb-6" size={80} />
                        <h2 className="text-3xl font-semibold text-zinc-900">Password Reset Successful</h2>
                        <p className="mt-4 text-zinc-600">Redirecting you to login...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}