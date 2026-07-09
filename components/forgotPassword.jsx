"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import OTPInput from "./otpInput";

export default function ForgotPasswordForm() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [maskedEmail, setMaskedEmail] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();
        if (!email) return;

        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1100));

        const masked = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
        setMaskedEmail(masked);
        setStep("otp");
        setIsLoading(false);
    };

    const handleVerifyOTP = async (otp) => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1300));
        setStep("success");
        setIsLoading(false);

        setTimeout(() => {
            window.location.href = "/auth/reset-password";
        }, 1600);
    };

    return (
        <div className="w-full max-w-md">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-900 mb-10 transition-colors">
                ← Back to Login
            </Link>

            <AnimatePresence mode="wait">
                {step === "email" && (
                    <motion.div
                        key="email"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-zinc-900">Forgot Password?</h1>
                            <p className="mt-3 text-lg text-zinc-600">
                                Enter your email address and we'll send you a verification code.
                            </p>
                        </div>

                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">EMAIL ADDRESS</label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-4 text-zinc-400" size={20} />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@algogrind.io"
                                        className="h-14 pl-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !email}
                                    className="h-14 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md"
                                >
                                    {isLoading ? "Sending OTP..." : "Send OTP"}
                                </Button>
                            </motion.div>
                        </form>
                    </motion.div>
                )}

                {step === "otp" && (
                    <motion.div
                        key="otp"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h1 className="text-4xl font-black tracking-tighter text-zinc-900">
                                Verify OTP
                            </h1>

                            <p className="mt-3 text-lg text-zinc-600">
                                We've sent a 6-digit code to
                            </p>

                            <p className="font-medium text-zinc-900 mt-1">
                                {maskedEmail}
                            </p>
                        </div>

                        <OTPInput
                            onComplete={handleVerifyOTP}
                            isLoading={isLoading}
                        />
                    </motion.div>
                )}

                {step === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <FiCheckCircle className="text-emerald-500 mb-6" size={80} />
                        <h2 className="text-3xl font-semibold text-zinc-900">Verification Successful</h2>
                        <p className="mt-4 text-zinc-600">Redirecting you to reset your password...</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}