
import { transporter } from "./transporter";

export async function sendMail({
    to,
    subject,
    html,
}) {
    try {
        await transporter.verify();
        console.log("SMTP READY");
        const info = await transporter.sendMail({
            from: `"AlgoGrind" <${process.env.SMTP_USER}>`,
            to,
            subject,
            html,
        });
        console.log("Email sent:", info.messageId);

        return info;
    } catch (error) {
        console.error("Email send failed:", error);
        throw error;
    }
}