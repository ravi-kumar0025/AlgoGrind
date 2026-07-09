import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins";
import mongoose from "mongoose";
import { connectDB } from "./db";
import { sendMail } from "../utils/send-mail"
import { verifyEmailTemplate } from "../lib/email-templates/email-verification"

await connectDB();
const AUTH_INSTANCE_ID = Math.random();

console.log("AUTH ID:", AUTH_INSTANCE_ID);

export const auth = betterAuth({
    database: mongodbAdapter(mongoose.connection.db),
    secret: process.env.BETTER_AUTH_SECRET,
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },

        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        },
    },
    plugins: [
        emailOTP({

            // expiresIn: 600,
            // otpLength: 6,
            // allowedAttempts: 5,

            async sendVerificationOTP({ email, otp, type }) {
                console.log("CALLBACK AUTH ID:", AUTH_INSTANCE_ID);
                console.log(email, otp);
                if (type === "email-verification" || type === "sign-up" || type === "user-verification") {
                    console.log("✅🧨🧨🧨🧨🧨🧨🧨🧨🧨🧨🧨🧨")
                    await sendMail({
                        to: email,
                        subject: "Verify Your Email - AlgoGrind",
                        html: verifyEmailTemplate({ otp }),
                    });
                }

                if (type === "forget-password") {
                    await sendMail({
                        to: email,
                        subject: "Reset Your Password - AlgoGrind",
                        html: `<h1>Your OTP is ${otp}</h1>`,
                    });
                }
            },
        }),
    ],
});