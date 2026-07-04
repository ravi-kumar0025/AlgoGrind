"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginForm() {
    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white uppercase">
                    AlgoGrind
                </h1>
                <p className="mt-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Execute your potential.
                </p>
            </div>

            {/* Input fields CSS overrides */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        Email Address
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-400 dark:text-zinc-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" /></svg>
                        </span>
                        <Input
                            type="email"
                            placeholder="dev@algogrind.io"
                            className="h-11 pl-10 bg-white dark:bg-[#121315] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:bg-white dark:focus:bg-[#0e0f11] focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-cyan-500/15 focus-visible:border-blue-600 dark:focus-visible:border-cyan-500 rounded-lg shadow-inner transition-all duration-150 font-medium text-sm"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                            Password
                        </label>
                        <Link href="/auth/forgot" className="text-xs font-bold text-blue-600 dark:text-cyan-400 hover:underline tracking-tight">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-400 dark:text-zinc-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </span>
                        <Input
                            type="password"
                            placeholder="••••••••"
                            className="h-11 pl-10 bg-white dark:bg-[#121315] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus:bg-white dark:focus:bg-[#0e0f11] focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-cyan-500/15 focus-visible:border-blue-600 dark:focus-visible:border-cyan-500 rounded-lg shadow-inner transition-all duration-150 text-sm"
                        />
                    </div>
                </div>

                {/* Login Accent Button CSS */}
                <Button className="h-11 w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-cyan-400 hover:opacity-95 text-white font-bold text-sm tracking-tight shadow-md shadow-blue-500/10 dark:shadow-[0_0_20px_rgba(34,111,255,0.2)] active:scale-[0.99] transition-all duration-200 mt-6 flex items-center justify-center gap-2 rounded-lg">
                    Login
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                </Button>
            </form>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800/80" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-mono font-bold">
                    <span className="bg-white dark:bg-[#0c0d0e] px-3 text-zinc-400 dark:text-zinc-500">
                        Secure Connect
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
                <Button variant="outline" className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm rounded-lg">
                    Google
                </Button>
                <Button variant="outline" className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm rounded-lg">
                    GitHub
                </Button>
            </div>

            <p className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-500 pt-2 tracking-tight">
                New to the grind?{" "}
                <Link
                    href="/auth/signup"
                    className="font-bold text-blue-600 dark:text-cyan-400 underline-offset-4 hover:underline transition-colors"
                >
                    Create Account
                </Link>
            </p>
        </div>
    );
}