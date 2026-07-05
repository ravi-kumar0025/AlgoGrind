"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Stars } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { KernelSize } from "postprocessing";

function useTypewriter(text, speed = 110, eraseSpeed = 65, holdTime = 3800) {
    const [displayedText, setDisplayedText] = useState("");
    const [isErasing, setIsErasing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        let timer;
        if (!isErasing) {
            if (displayedText.length < text.length) {
                timer = setTimeout(() => setDisplayedText(text.substring(0, displayedText.length + 1)), speed);
            } else {
                setIsComplete(true);
                timer = setTimeout(() => setIsErasing(true), holdTime);
            }
        } else {
            if (displayedText.length > 0) {
                timer = setTimeout(() => setDisplayedText(text.substring(0, displayedText.length - 1)), eraseSpeed);
            } else {
                setIsErasing(false);
            }
        }
        return () => clearTimeout(timer);
    }, [displayedText, isErasing, text]);

    return { text: displayedText, isComplete };
}

function InteractiveNucleus({ isHovered }) {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
            if (isHovered) groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.06;
        }
    });

    return (
        <group ref={groupRef}>
            <mesh>
                <sphereGeometry args={[1.35, 64, 64]} />
                <meshStandardMaterial color="#4f46e5" emissive="#6366f1" metalness={0.85} roughness={0.2} />
            </mesh>
            <mesh rotation={[1.1, 0.6, 0]}>
                <torusGeometry args={[2.7, 0.07, 32, 110]} />
                <meshStandardMaterial color="#818cf8" emissive="#a5b4fc" metalness={0.9} roughness={0.15} />
            </mesh>
            <mesh rotation={[0.5, 2.2, 0.7]}>
                <torusGeometry args={[3.6, 0.06, 32, 100]} />
                <meshStandardMaterial color="#c084fc" emissive="#d8b4fe" metalness={0.88} roughness={0.2} />
            </mesh>
            <mesh rotation={[1.7, 1.3, 1.2]}>
                <torusGeometry args={[4.5, 0.05, 32, 90]} />
                <meshStandardMaterial color="#67e8f9" emissive="#67e8f9" metalness={0.85} roughness={0.25} />
            </mesh>
        </group>
    );
}

export default function AuthLayout({ children }) {
    const { text: typedLogo, isComplete: logoIsReady } = useTypewriter("ALGOGRIND");
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="min-h-screen h-screen w-screen grid md:grid-cols-2 overflow-hidden bg-[#F8FAFC] text-[#09090B]">

            {/* LEFT - FORM */}
            <div className="flex items-center justify-center p-8 md:p-16 bg-white border-r border-[#E4E4E7]">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>

            {/* RIGHT - 3D OBSERVATORY */}
            <div
                className="hidden md:flex relative overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#F8FAFC] via-white to-[#F1F5F9]">
                    <Canvas camera={{ position: [0, 0, 12], fov: 48 }}>
                        <InteractiveNucleus isHovered={isHovered} />
                        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.09} />
                        <Environment preset="studio" />
                    </Canvas>
                </div>

                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
                    className="relative z-10 flex flex-col justify-center px-12 xl:px-20 w-full"
                >
                    <div className="h-20 flex items-center">
                        <h1 className="text-7xl font-black tracking-[-3px] text-[#09090B]">
                            {typedLogo}
                        </h1>
                    </div>

                    <div className="mt-3 text-[28px] font-light text-zinc-600 tracking-tight">
                        <AnimatePresence mode="popLayout">
                            {logoIsReady && ["Practice.", "Learn.", "Conquer."].map((word, i) => (
                                <motion.span
                                    key={word}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.15 }}
                                >
                                    {word}{" "}
                                </motion.span>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 space-y-4 max-w-md">
                        {[
                            { title: "Advanced Problem Engine", desc: "Access 2,000+ curated algorithmic challenges with real-time feedback." },
                            { title: "Live Coding Sandboxes", desc: "Integrated high-performance terminal with multi-language support." },
                            { title: "Competitive Ranking", desc: "Track your progress and compete in global weekly contests." }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -2 }}
                                className="group p-6 rounded-3xl bg-white border border-[#E4E4E7] shadow-sm hover:shadow transition-all duration-300"
                            >
                                <h3 className="font-semibold text-lg text-[#18181B]">{item.title}</h3>
                                <p className="mt-2 text-sm text-zinc-600 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}