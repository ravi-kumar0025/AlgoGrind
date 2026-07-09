"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";


export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
        >
            <div>
                <h1 className="text-4xl font-black tracking-tighter text-zinc-900">AlgoGrind</h1>
                <p className="mt-2 text-lg text-zinc-600">Execute your potential.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">Email Address</label>
                    <div className="relative">
                        <FiMail className="absolute left-4 top-4 text-zinc-400" size={20} />
                        <Input
                            type="email"
                            placeholder="dev@algogrind.io"
                            className="h-14 pl-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between">
                        <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">Password</label>
                        <Link href="/auth/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className="relative">
                        <FiLock
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                            size={20}
                        />

                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="h-14 pl-12 pr-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
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

                <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                    <Button className="h-14 w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3">
                        Login
                        <FiArrowRight size={22} />
                    </Button>
                </motion.div>
            </form>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-6 text-sm font-medium text-zinc-400">SECURE CONNECT</span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-14 text-base font-medium rounded-2xl border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3">
                    <FcGoogle size={22} />
                    Google
                </Button>
                <Button variant="outline" className="h-14 text-base font-medium rounded-2xl border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3">
                    <FaGithub size={22} />
                    GitHub
                </Button>
            </div>

            <p className="text-center text-base text-zinc-600">
                New to the grind?{" "}
                <Link href="/auth/signup" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Create Account
                </Link>
            </p>
        </motion.div>
    );
}