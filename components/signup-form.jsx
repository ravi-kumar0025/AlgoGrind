"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import { signIn, signUp } from "../lib/auth-client";
import { toast } from "sonner";
import { sendOTP } from "../utils/sendOtp.js";
import { verifyOTP } from "../utils/verifyOtp.js";
import OTPInput from "./otpInput";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState("form");
    const [isLoading, setIsLoading] = useState(false);

    const handleGithubSignUp = async () => {
        try {
            await signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
            });
        } catch (error) {
            toast.error(error?.message || "GitHub sign-up failed");
        }
    };

    const handleGoogleSignUp = async () => {
        try {
            await signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
            });
        } catch (error) {
            toast.error(error?.message || "Google sign-up failed");
        }
    };

    const emailSignup = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Name is required");
            return;
        }

        if (!email.trim()) {
            toast.error("Email is required");
            return;
        }

        if (!password) {
            toast.error("Password is required");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setIsLoading(true);

            const { error } = await signUp.email({
                name,
                email,
                password,
            });

            if (error) {
                toast.error(error.message || "Failed to sign up");
                return;
            }

            await sendOTP(email, "email-verification");
            setStep("otp");
            toast.success("Verification code sent to your email");
        } catch (error) {
            toast.error(error?.message || "Failed to send verification code");
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOTP = async (otp) => {
        try {
            setIsLoading(true);
            await verifyOTP(email, otp);

            toast.success("Account created and verified successfully!");

            setTimeout(() => {
                window.location.href = "/dashboard";
            }, 1000);
        } catch (error) {
            toast.error(error?.message || "Invalid OTP");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {step === "form" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="w-full space-y-8"
                >
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
                            Create Account
                        </h1>
                        <p className="mt-3 text-xl text-zinc-600">
                            Join the elite ranks of AlgoGrind and master the machine.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            className="h-12 text-lg font-medium rounded-2xl border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3 cursor-pointer"
                            onClick={handleGoogleSignUp}
                        >
                            <FcGoogle size={22} />
                            Google
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-12 text-lg font-medium rounded-2xl border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3 cursor-pointer"
                            onClick={handleGithubSignUp}
                        >
                            <FaGithub size={22} />
                            GitHub
                        </Button>
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-zinc-200" />
                        </div>
                        <div className="relative flex justify-center">
                            <span className="bg-white px-6 text-sm font-medium text-zinc-400">
                                OR CONTINUE WITH EMAIL
                            </span>
                        </div>
                    </div>

                    <form className="space-y-6" onSubmit={emailSignup}>
                        <div className="space-y-2">
                            <label className="text-base font-semibold tracking-widest uppercase text-zinc-500">
                                Name
                            </label>
                            <div className="relative">
                                <FiUser className="absolute left-4 top-4 text-zinc-400" size={20} />
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="cyber_punk_88"
                                    className="h-14 pl-12 text-lg rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                                />
                            </div>
                        </div>

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
                                    placeholder="dev@algogrind.io"
                                    className="h-14 pl-12 text-lg rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-base font-semibold tracking-widest uppercase text-zinc-500">
                                    Password
                                </label>

                                <div className="relative">
                                    <FiLock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                        size={20}
                                    />

                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Password"
                                        className="h-14 pl-12 pr-12 text-lg rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
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
                                <label className="text-base font-semibold tracking-widest uppercase text-zinc-500">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <FiLock
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                        size={20}
                                    />

                                    <Input
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Confirm password"
                                        className="h-14 pl-12 text-lg rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                                    />
                                </div>
                            </div>
                        </div>

                        <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                            <Button
                                className="h-14 w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-xl rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
                                type="submit"
                            >
                                Create Account
                                <FiArrowRight size={22} />
                            </Button>
                        </motion.div>
                    </form>

                    <p className="text-center text-lg text-zinc-600">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                            Log in
                        </Link>
                    </p>
                </motion.div>
            )}

            {step === "otp" && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >
                    <div>
                        <h1 className="text-5xl font-black tracking-tighter text-zinc-900">
                            Verify Email
                        </h1>
                        <p className="mt-3 text-xl text-zinc-600">
                            We&apos;ve sent a verification code to
                        </p>
                        <p className="mt-1 text-lg font-medium text-zinc-900">
                            {email}
                        </p>
                    </div>

                    <OTPInput onComplete={handleVerifyOTP} isLoading={isLoading} />

                    <div className="flex items-center justify-between text-base">
                        <button
                            type="button"
                            onClick={async () => {
                                try {
                                    setIsLoading(true);
                                    await sendOTP(email, "email-verification");
                                    toast.success("New code sent!");
                                } catch (err) {
                                    toast.error(err?.message || "Failed to resend code");
                                } finally {
                                    setIsLoading(false);
                                }
                            }}
                            disabled={isLoading}
                            className="text-indigo-600 hover:text-indigo-700 disabled:opacity-50"
                        >
                            Resend Code
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep("form")}
                            className="text-zinc-500 hover:text-zinc-700"
                        >
                            Change Email
                        </button>
                    </div>
                </motion.div>
            )}
        </>
    );
}
