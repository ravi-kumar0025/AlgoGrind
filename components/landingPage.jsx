'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, Star, Zap } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function AlgoGrindLanding() {
    const vantaRef = useRef(null);
    const vantaEffect = useRef(null);
    const router = useRouter();

    useEffect(() => {
        let isMounted = true;

        const loadVanta = async () => {
            if (!vantaRef.current || vantaEffect.current) return;

            try {
                const THREE = await import('three');
                const VANTA = await import('vanta/dist/vanta.net.min');

                if (!isMounted) return;

                vantaEffect.current = VANTA.default({
                    el: vantaRef.current,
                    THREE: THREE,
                    color: 0x6366f1,
                    backgroundColor: 0xf8f9fa,
                    points: 12,
                    maxDistance: 24,
                    spacing: 18,
                    showDots: true,
                    mouseControls: true,
                    touchControls: true,
                    speed: 0.75,
                });
            } catch (error) {
                console.error("Vanta failed to load:", error);
            }
        };

        loadVanta();

        return () => {
            isMounted = false;
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, []);

    return (
        <div className="bg-[#F8F9FA] text-zinc-950 min-h-screen overflow-hidden font-sans">
            {/* NAV */}
            <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
                    <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 rounded-2xl bg-linear-to-br from-indigo-600 via-violet-600 to-purple-600 flex items-center justify-center text-white shadow-lg">
                            <Zap className="w-5 h-5" />
                        </div>
                        <div className="font-black tracking-[-3px] text-4xl bg-clip-text text-transparent bg-linear-to-r from-zinc-900 to-violet-700">
                            ALGOGRIND
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost"
                            className="font-medium text-zinc-700 hover:text-black rounded-2xl cursor-pointer"
                            onClick={() => router.push("/auth/login")}>
                            Login
                        </Button>
                        <Button
                            className="bg-linear-to-r from-zinc-900 to-black hover:brightness-105 text-white rounded-2xl px-8 font-semibold cursor-pointer"
                            onClick={() => router.push("/auth/signup")}
                        >
                            Sign Up
                        </Button>
                    </div>
                </div>
            </nav>

            <section className="relative min-h-[820px] flex items-center pt-20">
                <div ref={vantaRef} className="absolute inset-0 z-0" />

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">


                    <h1 className="text-7xl md:text-[96px] font-black tracking-[-5px] leading-none mb-8">
                        Master{" "}
                        <span className="bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600">
                            Problem Solving
                        </span>
                        <br />
                        Build Interview Confidence
                    </h1>

                    <p className="max-w-2xl mx-auto text-2xl text-zinc-600 mb-14">
                        Practice coding challenges, strengthen your algorithmic thinking, and prepare for technical interviews through structured learning and consistent practice.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center">
                        <Button
                            size="lg"
                            className="group bg-linear-to-r from-indigo-600 via-violet-600 to-purple-600 hover:brightness-110 text-white text-lg px-12 py-8 rounded-3xl shadow-xl shadow-violet-500/30 flex items-center gap-3 cursor-pointer"
                            onClick={() => router.push("/auth/signup")}
                        >
                            Get Started Free
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="border-2 border-zinc-300 hover:border-violet-300 hover:bg-white text-lg px-12 py-8 rounded-3xl cursor-pointer"
                        >
                            <a href="#problems">Explore Platform</a>
                        </Button>
                    </div>
                </div>
            </section>

            <div className="border-y border-zinc-200 py-12 bg-white">
                <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
                    {[
                        { number: "50K+", label: "Problems Solved", accent: "from-indigo-500 to-violet-500" },
                        { number: "10K+", label: "Active Learners", accent: "from-violet-500 to-purple-500" },
                        { number: "25+", label: "Programming Languages", accent: "from-purple-500 to-fuchsia-500" },
                        { number: "98%", label: "Success Rate", accent: "from-emerald-500 to-teal-500" },
                    ].map((stat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -6 }}
                            className="text-center group"
                        >
                            <div className={`text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-linear-to-r ${stat.accent}`}>
                                {stat.number}
                            </div>
                            <div className="text-zinc-600 mt-3 text-sm uppercase tracking-widest font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <section id="problems" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <Badge variant="secondary" className="mb-4 bg-violet-100 text-violet-700 border-violet-200">WHY ALGOGRIND</Badge>
                        <h2 className="text-5xl font-bold tracking-tighter">Everything You Need To Grow As A Developer</h2>
                        <p className="text-xl text-zinc-600 mt-4 max-w-2xl mx-auto">
                            From daily practice to interview preparation, AlgoGrind provides the tools and guidance to help you improve consistently.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "Interactive Practice", desc: "Solve carefully curated coding problems and strengthen your problem-solving skills through hands-on learning." },
                            { title: "Progress Tracking", desc: "Monitor your growth, identify weak areas, and stay motivated with detailed performance insights." },
                            { title: "Community Learning", desc: "Connect with fellow learners, exchange ideas, and learn from a growing developer community." },
                            { title: "Instant Feedback", desc: "Receive immediate results, explanations, and guidance to accelerate your learning process." },
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -8 }}
                                className="group bg-white border border-zinc-100 hover:border-violet-300 rounded-3xl p-10 hover:shadow-xl transition-all h-full flex flex-col"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-8 text-violet-600 group-hover:rotate-12 transition-transform">
                                    <Star className="w-7 h-7" />
                                </div>
                                <h3 className="text-3xl font-semibold tracking-tight mb-4 text-zinc-900">{f.title}</h3>
                                <p className="text-zinc-600 leading-relaxed flex-1">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-zinc-50" id="journey">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-5xl font-bold tracking-tighter">Built For Every Stage Of Your Journey</h2>
                        <p className="text-xl text-zinc-600 mt-4 max-w-2xl mx-auto">
                            Whether you're writing your first algorithm or preparing for top technical interviews, AlgoGrind grows with you.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { level: "Beginner Friendly", desc: "Build strong fundamentals with guided practice and carefully selected challenges." },
                            { level: "Interview Preparation", desc: "Strengthen your DSA knowledge and gain confidence for coding interviews." },
                            { level: "Advanced Problem Solving", desc: "Tackle challenging problems designed to sharpen analytical thinking and competitive programming skills." },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02, borderColor: "#8b5cf6" }}
                                className="bg-white p-10 rounded-3xl border border-zinc-100 hover:shadow-xl transition-all"
                            >
                                <Badge className="mb-6 bg-linear-to-r from-violet-600 to-purple-600 text-white">{item.level}</Badge>
                                <p className="text-zinc-600 text-lg leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24 bg-linear-to-br from-zinc-900 to-black text-white">
                <div className="max-w-3xl mx-auto text-center px-6">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Ready To Take Your Skills Further?</h2>
                    <p className="text-xl text-zinc-400 mb-10">Join thousands of learners building stronger problem-solving skills every day.</p>

                    <Button
                        size="lg"
                        className="bg-white text-black hover:bg-zinc-100 text-xl px-16 py-8 rounded-3xl font-semibold shadow-2xl cursor-pointer"
                        onClick={() => router.push("/auth/signup")}
                    >
                        Start Learning Today
                    </Button>
                </div>
            </section>

            <footer className="py-12 text-center text-sm text-zinc-500 border-t border-zinc-200">
                © 2026 ALGOGRIND • NEXT.JS + MONGODB POWERED
            </footer>
        </div>
    );
}