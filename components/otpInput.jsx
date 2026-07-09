"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function OTPInput({ onComplete, isLoading }) {
    const [otp, setOtp] = useState(Array(6).fill(""));
    const inputs = useRef([]);

    const handleChange = (index, value) => {
        if (value.length > 1) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 5) {
            inputs.current[index + 1].focus();
        }

        if (newOtp.every(digit => digit !== "")) {
            onComplete(newOtp.join(""));
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            inputs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
        const newOtp = [...otp];
        pastedData.forEach((char, i) => {
            if (i < 6) newOtp[i] = char;
        });
        setOtp(newOtp);
        if (pastedData.length === 6) onComplete(pastedData.join(""));
    };

    return (
        <div className="space-y-6">
            <div className="flex gap-3 justify-center">
                {otp.map((digit, index) => (
                    <motion.input
                        key={index}
                        ref={el => inputs.current[index] = el}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={handlePaste}
                        className="w-12 h-14 text-center text-2xl font-semibold border border-zinc-200 focus:border-indigo-500 rounded-2xl focus:ring-1 focus:ring-indigo-200 bg-white transition-all"
                    />
                ))}
            </div>

            <motion.div whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }}>
                <button
                    onClick={() => onComplete(otp.join(""))}
                    disabled={isLoading || otp.some(d => d === "")}
                    className="h-14 w-full bg-linear-to-r from-indigo-600 to-violet-600 text-white font-semibold text-lg rounded-2xl shadow-md hover:shadow-lg disabled:opacity-50 transition-all"
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </button>
            </motion.div>
        </div>
    );
}