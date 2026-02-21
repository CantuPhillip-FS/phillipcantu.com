import type { Metadata } from "next";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
    title: "Phillip Cantu",
    description: "A Next.js App",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-gray-950 text-slate-100 antialiased px-4 min-h-screen flex flex-col">
                <Navbar />
                <main className="grow max-w-5xl mx-auto">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
