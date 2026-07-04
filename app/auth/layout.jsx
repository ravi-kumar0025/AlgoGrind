"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";


function useTypewriter(text, speed = 140, eraseSpeed = 80, holdTime = 3000) {
    const [displayedText, setDisplayedText] = useState("");
    const [isErasing, setIsErasing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timer;

        if (!isErasing) {
            if (displayedText.length < text.length) {
                setIsComplete(false);
                timer = setTimeout(() => {
                    setDisplayedText(text.substring(0, displayedText.length + 1));
                }, speed);
            } else {
                // Fully typed state reached
                setIsComplete(true);
                timer = setTimeout(() => setIsErasing(true), holdTime);
            }
        } else {
            if (displayedText.length > 0) {
                setIsComplete(false);
                timer = setTimeout(() => {
                    setDisplayedText(text.substring(0, displayedText.length - 1));
                }, eraseSpeed);
            } else {
                setIsErasing(false);
            }
        }
        return () => clearTimeout(timer);
    }, [displayedText, isErasing, text, speed, eraseSpeed, holdTime]);

    return { text: displayedText, isComplete };
}

export default function AuthLayout({ children }) {
    // Hooks tracking the typewriter engine
    const { text: typedLogo, isComplete: logoIsReady } = useTypewriter("AlgoGrind", 150, 90, 3500);

    // Stagger layout orchestrations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 120, damping: 18 }
        }
    };

    // Stagger layout settings for individual turn-by-turn subtitle tags
    const subtitleStepVariants = {
        hidden: { opacity: 0, x: -8 },
        visible: (i) => ({
            opacity: 1,
            x: 0,
            transition: {
                delay: i * 0.35,
                type: "spring",
                stiffness: 140,
                damping: 14
            }
        }),
        exit: {
            opacity: 0,
            x: 10,
            transition: { duration: 0.2 }
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-zinc-50 dark:bg-[#0c0d0e] text-zinc-900 dark:text-zinc-100 font-sans antialiased selection:bg-cyan-500/20 transition-colors duration-300">

            {/* Left Column: Form Action View Engine */}
            <div className="flex items-center justify-center px-6 py-12 md:px-16 relative z-10 bg-gradient-to-b from-white to-zinc-50 dark:from-[#0c0d0e] dark:to-[#090a0a]">
                <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[140px] pointer-events-none" />
                <div className="w-full max-w-md relative">
                    {children}
                </div>
            </div>

            {/* Right Column: Premium Active Branding Canvas Area */}
            <div className="hidden md:flex relative overflow-hidden border-l border-zinc-200 dark:border-zinc-900 bg-zinc-100 dark:bg-[#08090a] select-none">

                {/* Micro Dot-Matrix Blueprint Layout Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e2022_1px,transparent_1px)] [background-size:24px_24px] opacity-60 dark:opacity-30" />

                {/* Atmospheric Flow Aura Glow Fluid Element */}
                <motion.div
                    animate={{
                        scale: [1, 1.1, 0.95, 1],
                        x: [0, 20, -10, 0],
                        y: [0, -15, 15, 0],
                    }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[20%] left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 to-cyan-500/10 dark:from-indigo-500/10 dark:to-cyan-500/10 rounded-full blur-[160px] pointer-events-none"
                />

                {/* Main Branding Information Panel */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="relative z-10 flex flex-col justify-center px-16 xl:px-24 w-full"
                >
                    {/* Upper Real-Time Platform Engine Status Badge */}
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-300/80 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 backdrop-blur-md text-[10px] font-mono font-semibold tracking-widest text-cyan-600 dark:text-cyan-400 w-fit mb-8 uppercase shadow-sm"
                    >
                        <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-500 dark:bg-cyan-400 animate-pulse" />
                        SYSTEM_STATUS: ONLINE
                    </motion.div>

                    {/* Typewriter Header Container (Fixed space prevents document reflow jumps) [cite: 87] */}
                    <div className="h-[64px] flex items-center max-w-xl">
                        <h1 className="text-5xl xl:text-6xl font-black tracking-tighter text-zinc-900 dark:text-white uppercase whitespace-nowrap">
                            {typedLogo.startsWith("Algo") ? (
                                <>
                                    Algo
                                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-cyan-400 dark:to-indigo-400">
                                        {typedLogo.substring(4)}
                                    </span>
                                </>
                            ) : (
                                typedLogo
                            )}
                        </h1>
                    </div>

                    {/* Turn-by-Turn Sequential Subtitles (Renders dynamically upon completion flag) [cite: 88] */}
                    <div className="mt-4 text-lg xl:text-xl font-medium tracking-tight text-zinc-600 dark:text-zinc-400 flex items-center gap-2.5 h-8">
                        <span className="inline-block w-1 h-5 bg-blue-600 dark:bg-cyan-500 rounded-full" />
                        <div className="flex gap-1.5 overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                {logoIsReady && ["Practice.", "Learn.", "Conquer."].map((word, index) => (
                                    <motion.span
                                        key={word}
                                        custom={index}
                                        variants={subtitleStepVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className={index === 2 ? "font-bold text-zinc-900 dark:text-zinc-200" : ""}
                                    >
                                        {word}
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Grid Infrastructure Product Value Cards */}
                    <div className="mt-10 space-y-3.5 max-w-md">
                        {[
                            { title: "Advanced Problem Engine", desc: "Access 2,000+ curated algorithmic challenges with real-time feedback." },
                            { title: "Live Coding Sandboxes", desc: "Integrated high-performance terminal with multi-language support." },
                            { title: "Competitive Ranking", desc: "Track your progress and compete in global weekly contests." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ x: 6, scale: 1.01 }}
                                className="group flex gap-4 p-4 rounded-xl border border-zinc-200 dark:border-zinc-900/80 bg-white/40 dark:bg-zinc-900/20 backdrop-blur-sm transition-all duration-300 hover:border-zinc-300 dark:hover:border-zinc-800 hover:bg-white/80 dark:hover:bg-zinc-900/40 cursor-pointer"
                            >
                                <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-lg bg-zinc-100 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-emerald-600 dark:text-emerald-400 group-hover:border-emerald-500/30 transition-colors">
                                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <div className="space-y-0.5">
                                    <h3 className="text-zinc-800 dark:text-zinc-200 font-bold text-sm tracking-tight">{item.title}</h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-xs leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Integrated Static Terminal View Codeblock */}
                    <motion.div
                        variants={itemVariants}
                        className="mt-10 relative rounded-xl border border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950/60 p-2 overflow-hidden max-w-md shadow-lg dark:shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-950 via-transparent to-transparent z-10" />
                        <div className="rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-900 bg-zinc-50/50 dark:bg-zinc-900/10 p-4 font-mono text-[10px] font-medium text-blue-600 dark:text-cyan-500/80 space-y-1">
                            <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}>{"function solve(n) {"}</motion.p>
                            <motion.p className="pl-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}>{"const dp = new Array(n + 1);"}</motion.p>
                            <motion.p className="pl-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.6 }}>{"dp[0] = 1; i < n; i++"}</motion.p>
                            <motion.p className="pl-4" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 0.8 }}>{"return dp[n-1];"}</motion.p>
                            <motion.p animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 3, repeat: Infinity, delay: 1.0 }}>{"}"}</motion.p>
                        </div>
                    </motion.div>

                </motion.div>

                {/* Environment Global Footer Metadata */}
                <div className="absolute bottom-6 left-16 z-10 text-[10px] text-zinc-400 dark:text-zinc-700 font-mono tracking-widest uppercase">
                    // system_ready: true
                </div>
            </div>

        </div>
    );
}