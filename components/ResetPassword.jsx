"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiLock, FiEye, FiEyeOff, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { emailOtp } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ResetPasswordForm() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetOtp, setResetOtp] = useState("");

    useEffect(() => {
        // Retrieve the verified email and OTP passed from the forgot-password flow
        const email = sessionStorage.getItem("reset_email");
        const otp = sessionStorage.getItem("reset_otp");

        if (!email || !otp) {
            toast.error("Invalid session. Please restart the password reset flow.");
            setTimeout(() => {
                window.location.href = "/auth/forgot-password";
            }, 2000);
            return;
        }

        setResetEmail(email);
        setResetOtp(otp);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            toast.error("Password must be at least 8 characters");
            return;
        }

        if (!resetEmail || !resetOtp) {
            toast.error("Session expired. Please restart the password reset.");
            window.location.href = "/auth/forgot-password";
            return;
        }

        try {
            setIsLoading(true);
            // Official Better Auth method for resetting password with OTP
            const { error } = await emailOtp.resetPassword({
                email: resetEmail,
                otp: resetOtp,
                password,
            });

            if (error) {
                toast.error(error.message || "Failed to reset password. The code may have expired.");
                return;
            }

            // Clear session storage after successful reset
            sessionStorage.removeItem("reset_email");
            sessionStorage.removeItem("reset_otp");

            setIsSuccess(true);
            toast.success("Password reset successfully!");

            setTimeout(() => {
                window.location.href = "/auth/login";
            }, 2000);
        } catch (err) {
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
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
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-14 pl-12 pr-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500"
                                        required
                                        minLength={8}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">CONFIRM NEW PASSWORD</label>
                                <div className="relative">
                                    <FiLock className="absolute left-4 top-4 text-zinc-400" size={20} />
                                    <Input
                                        type={showConfirm ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className="h-14 pl-12 pr-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors"
                                    >
                                        {showConfirm ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !password || !confirmPassword}
                                    className="h-14 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md cursor-pointer"
                                >
                                    {isLoading ? "Resetting..." : "Reset Password"}
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