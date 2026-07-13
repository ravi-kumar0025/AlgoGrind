'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, ChevronRight, Star } from "lucide-react";

export default function AlgoGrindLanding() {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

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
          color: 0x4f46e5,
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
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-linear-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white">
              <span className="font-black text-2xl tracking-tighter">AG</span>
            </div>
            <div className="font-semibold tracking-tighter text-3xl">ALGOGRIND</div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" className="font-medium" asChild>
              <a href="/auth/login">Login</a>
            </Button>
            <Button className="bg-zinc-900 hover:bg-black text-white rounded-2xl px-8" asChild>
              <a href="/auth/signup">Sign Up</a>
            </Button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-[820px] flex items-center pt-20">
        <div ref={vantaRef} className="absolute inset-0 z-0" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">

          <h1 className="text-7xl md:text-[96px] font-black tracking-tighter leading-none mb-8">
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
              className="bg-linear-to-r from-indigo-600 to-violet-600 hover:brightness-110 text-white text-lg px-12 py-8 rounded-3xl shadow-xl"
              asChild
            >
              <a href="/auth/signup">Get Started Free</a>
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-zinc-300 hover:bg-white text-lg px-12 py-8 rounded-3xl"
              asChild
            >
              <a href="#problems">Explore Platform</a>
            </Button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <div className="border-y border-zinc-200 py-10 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
          {[
            { number: "50K+", label: "Problems Solved" },
            { number: "10K+", label: "Active Learners" },
            { number: "25+", label: "Programming Languages" },
            { number: "98%", label: "Success Rate" },
          ].map((stat, i) => (
            <motion.div key={i} className="text-center">
              <div className="text-5xl font-bold text-zinc-900 tracking-tighter">{stat.number}</div>
              <div className="text-zinc-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <section id="problems" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">WHY ALGOGRIND</Badge>
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
                whileHover={{ y: -6 }}
                className="group bg-white border border-zinc-100 rounded-3xl p-10 hover:border-violet-200 hover:shadow-xl transition-all h-full flex flex-col"
              >
                <h3 className="text-3xl font-semibold tracking-tight mb-4">{f.title}</h3>
                <p className="text-zinc-600 leading-relaxed flex-1">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING JOURNEY */}
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
                whileHover={{ scale: 1.02 }}
                className="bg-white p-10 rounded-3xl border border-zinc-100 hover:border-violet-200 transition-all"
              >
                <Badge className="mb-6">{item.level}</Badge>
                <p className="text-zinc-600 text-lg leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 bg-linear-to-br from-zinc-900 to-black text-white">
        <div className="max-w-3xl mx-auto text-center px-6">
          <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">Ready To Take Your Skills Further?</h2>
          <p className="text-xl text-zinc-400 mb-10">Join thousands of learners building stronger problem-solving skills every day.</p>

          <Button
            size="lg"
            className="bg-white text-black hover:bg-zinc-100 text-xl px-16 py-8 rounded-3xl"
            asChild
          >
            <a href="/auth/signup">Start Learning Today</a>
          </Button>
        </div>
      </section>

      <footer className="py-12 text-center text-sm text-zinc-500 border-t">
        © 2026 ALGOGRIND • NEXT.JS + MONGODB POWERED
      </footer>
    </div>
  );
}