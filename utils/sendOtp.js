"use client";

import { emailOtp } from "@/lib/auth-client";

const sendOTP = async (email, type) => {
    const { data, error } = await emailOtp.sendVerificationOtp({
        email,
        type
    });


    if (error) {
        throw new Error(error.message);
    }
    return data;
};

export { sendOTP }

