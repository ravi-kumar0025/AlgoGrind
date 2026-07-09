import { emailOtp } from "@/lib/auth-client";

const verifyOTP = async (email, otp) => {
    const { data, error } = await emailOtp.verifyEmail({
        email,
        otp,
    });

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export { verifyOTP }

