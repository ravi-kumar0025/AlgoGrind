"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiMail, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import OTPInput from "./otpInput";
import { emailOtp } from "@/lib/auth-client";
import { toast } from "sonner";

export default function ForgotPasswordForm() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [maskedEmail, setMaskedEmail] = useState("");

    const handleSendOTP = async (e) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error("Please enter your email address");
            return;
        }

        try {
            setIsLoading(true);
            const { error } = await emailOtp.requestPasswordReset({ email });

            if (error) {
                toast.error(error.message || "Failed to send reset code");
                return;
            }

            const masked = email.replace(/(.{2})(.*)(@.*)/, "$1***$3");
            setMaskedEmail(masked);
            setStep("otp");
            toast.success("Reset code sent to your email");
        } catch (err) {
            toast.error(err?.message || "Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (otp) => {
        try {
            setIsLoading(true);
            const { error } = await emailOtp.checkVerificationOtp({
                email,
                otp,
                type: "forget-password",
            });

            if (error) {
                toast.error(error.message || "Invalid or expired code");
                return;
            }

            setStep("success");
            sessionStorage.setItem("reset_email", email);
            sessionStorage.setItem("reset_otp", otp);

            setTimeout(() => {
                window.location.href = "/auth/reset-password";
            }, 1600);
        } catch (err) {
            toast.error(err?.message || "Invalid or expired code");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <Link
                href="/auth/login"
                className="inline-flex items-center gap-2 text-base text-zinc-500 hover:text-zinc-900 mb-10 transition-colors"
            >
                {"<-"} Back to Login
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
                            <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
                                Forgot Password?
                            </h1>
                            <p className="mt-3 text-xl text-zinc-600">
                                Enter your email address and we&apos;ll send you a verification code.
                            </p>
                        </div>

                        <form onSubmit={handleSendOTP} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-base font-semibold tracking-widest uppercase text-zinc-500">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <FiMail className="absolute left-4 top-4 text-zinc-400" size={20} />
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@algogrind.io"
                                        className="h-14 pl-12 text-lg rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                                        required
                                    />
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading || !email}
                                    className="h-14 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xl rounded-2xl shadow-md cursor-pointer"
                                >
                                    {isLoading ? "Sending..." : "Send Reset Code"}
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
                            <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
                                Verify OTP
                            </h1>
                            <p className="mt-3 text-xl text-zinc-600">
                                We&apos;ve sent a 6-digit code to
                            </p>
                            <p className="mt-1 text-lg font-medium text-zinc-900">
                                {maskedEmail}
                            </p>
                        </div>

                        <OTPInput onComplete={handleVerifyOTP} isLoading={isLoading} />

                        <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={isLoading}
                            className="text-base text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                        >
                            Didn&apos;t receive a code? Resend
                        </button>
                    </motion.div>
                )}

                {step === "success" && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <FiCheckCircle className="text-emerald-500 mb-6" size={80} />
                        <h2 className="text-3xl font-semibold text-zinc-900">
                            Verification Successful
                        </h2>
                        <p className="mt-4 text-zinc-600">
                            Redirecting you to reset your password...
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
