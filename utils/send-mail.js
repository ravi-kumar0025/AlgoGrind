
import { transporter } from "./transporter";

export async function sendMail({
    to,
    subject,
    html,
}) {
    try {
        console.time("mail send")
        console.log("Sending OTP to:", to);
        const info = await transporter.sendMail({
            from: `"AlgoGrind" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        console.timeEnd("mail send")
        console.log("Email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("Email send failed:", error);
        throw error;
    }
}