import { transporter } from "@/app/mail/transporter";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const info = await transporter.sendMail({
            from: `"Portfolio Test" <${process.env.SMTP_USER}>`,
            to: "thereisphil@gmail.com", // send to yourself
            subject: "Test Email 📧",
            text: "If you received this, SMTP works! 🔥",
        });

        return NextResponse.json({
            success: true,
            messageId: info.messageId,
        });
    } catch (error) {
        console.error("Send failed:", error);

        return NextResponse.json(
            { success: false, error: "Email failed to send" },
            { status: 500 },
        );
    }
}
