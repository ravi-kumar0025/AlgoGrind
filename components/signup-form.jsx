"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiArrowRight, FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    return (

        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full space-y-8"
        >
            <div>
                <p className="mt-2 text-lg text-zinc-600">Join the elite ranks of AlgoGrind and master the machine.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-12 text-base font-medium rounded-2xl border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3">
                    <FcGoogle size={22} />
                    Google
                </Button>

                <Button variant="outline" className="h-12 text-base font-medium rounded-2xl border-zinc-200 hover:bg-zinc-50 flex items-center justify-center gap-3">
                    <FaGithub size={22} />
                    GitHub
                </Button>
            </div>

            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200" />
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-white px-6 text-sm font-medium text-zinc-400">OR CONTINUE WITH EMAIL</span>
                </div>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>

                <div className="space-y-2">
                    <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">Username</label>
                    <div className="relative">
                        <FiUser className="absolute left-4 top-4 text-zinc-400" size={20} />
                        <Input
                            placeholder="cyber_punk_88"
                            className="h-14 pl-12 rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                        />
                    </div>
                </div>

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

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">
                            Password
                        </label>

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

                    <div className="space-y-2">
                        <label className="text-sm font-semibold tracking-widest uppercase text-zinc-500">
                            Confirm Password
                        </label>

                        <div className="relative">
                            <FiLock
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
                                size={20}
                            />

                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-14 pl-12 text-base rounded-2xl border-zinc-200 focus:border-indigo-500 bg-white"
                            />
                        </div>
                    </div>
                </div>

                <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                    <Button className="h-14 w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3">
                        Create Account
                        <FiArrowRight size={22} />
                    </Button>
                </motion.div>

            </form>

            <p className="text-center text-base text-zinc-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
                    Log in
                </Link>
            </p>

        </motion.div>
    );
}