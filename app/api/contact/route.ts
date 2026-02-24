import { transporter } from "@/app/mail/transporter";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { success: false, error: "All fields are required" },
                { status: 400 },
            );
        }

        // Send email to me
        await transporter.sendMail({
            from: `"New Contact" <${process.env.SMTP_USER}>`,
            to: "hello@phillipcantu.com",
            subject: "New Contact Form Submission",
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
        });

        // Send confirmation email to the user
        await transporter.sendMail({
            from: `"Phillip Cantu" <${process.env.SMTP_USER}>`,
            to: email,
            subject: "Message Received ✅",
            text: `Hi ${name},

Thanks for reaching out! I’ve received your message and will get back to you as soon as possible.

Here’s a copy of your message:

"${message}"

Talk soon,
Phillip Cantu
hello@phillipcantu.com`,
            html: `
        <p>Hi ${name},</p>
        <p>Thanks for reaching out! I’ve received your message and will get back to you as soon as possible.</p>
        <p><strong>Your message:</strong></p>
        <blockquote>${message}</blockquote>
        <p>Talk soon,<br/>Phillip Cantu<br/>hello@phillipcantu.com</p>
      `,
        });

        return NextResponse.json(
            { success: true, message: "Emails sent successfully" },
            { status: 200 },
        );
    } catch (error: any) {
        console.error("Send failed:", error);

        return NextResponse.json(
            { success: false, error: error.message || "Email failed to send" },
            { status: 500 },
        );
    }
}
