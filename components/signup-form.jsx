"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignupForm() {
    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-3xl font-black tracking-tight text-zinc-900 dark:text-white">
                    Initialize Account
                </h1>
                <p className="mt-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    Join the elite ranks of AlgoGrind and master the machine.
                </p>
            </div>

            {/* Social Connect Buttons CSS */}
            <div className="grid grid-cols-2 gap-3.5">
                <Button variant="outline" className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm rounded-lg">
                    <svg className="h-3.5 w-3.5 mr-2 text-zinc-900 dark:text-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.65 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    Google
                </Button>

                <Button variant="outline" className="h-10 border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/20 hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white font-semibold text-xs tracking-tight transition-all duration-200 shadow-sm rounded-lg">
                    <svg className="h-3.5 w-3.5 mr-2 text-zinc-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.024A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.293 2.747-1.024 2.747-1.024.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                </Button>
            </div>

            <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-200 dark:border-zinc-800/80" />
                </div>
                <div className="relative flex justify-center text-[9px] uppercase tracking-widest font-mono font-bold">
                    <span className="bg-white dark:bg-[#0c0d0e] px-3 text-zinc-400 dark:text-zinc-500">
                        or continue with email
                    </span>
                </div>
            </div>

            {/* Input Fields Container CSS */}
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                        Username
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-400 dark:text-zinc-500">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                        </span>
                        <Input
                            placeholder="cyber_punk_88"
                            className="h-11 pl-10 bg-white dark:bg-[#121315] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:bg-white dark:focus:bg-[#0e0f11] focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-cyan-500/15 focus-visible:border-blue-600 dark:focus-visible:border-cyan-500 rounded-lg shadow-inner transition-all duration-150 font-medium text-sm"
                        />
                    </div>
                </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                            Password
                        </label>
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

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-400 dark:text-zinc-500">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-3.5 flex items-center text-zinc-400 dark:text-zinc-500">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                            </span>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                className="h-11 pl-10 bg-white dark:bg-[#121315] border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-200 placeholder:text-zinc-300 dark:placeholder:text-zinc-700 focus-white dark:focus:bg-[#0e0f11] focus-visible:ring-2 focus-visible:ring-blue-500/20 dark:focus-visible:ring-cyan-500/15 focus-visible:border-blue-600 dark:focus-visible:border-cyan-500 rounded-lg shadow-inner transition-all duration-150 text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Action Button CSS */}
                <Button className="h-11 w-full bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-cyan-400 hover:opacity-95 text-white font-bold text-sm tracking-tight shadow-md shadow-blue-500/10 dark:shadow-[0_0_20px_rgba(34,111,255,0.2)] active:scale-[0.99] transition-all duration-200 mt-6 flex items-center justify-center gap-2 rounded-lg">
                    Create Account
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                </Button>
            </form>

            <p className="text-center text-xs font-semibold text-zinc-500 dark:text-zinc-500 pt-2 tracking-tight">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-bold text-zinc-700 dark:text-zinc-300 underline-offset-4 hover:underline hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
                >
                    Log in
                </Link>
            </p>
        </div>
    );
}