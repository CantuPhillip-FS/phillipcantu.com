"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactSheet = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const isFormValid =
        form.name.trim() !== "" &&
        form.email.trim() !== "" &&
        form.message.trim() !== "";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid || isSubmitting) return;
        setIsSubmitting(true);

        const getDate = new Date().toLocaleString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
        });

        try {
            await toast.promise(
                fetch("/api/contact", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(form),
                }).then(async (res) => {
                    if (!res.ok) {
                        const data = await res.json();
                        throw new Error(data.error || "Failed to send message");
                    }
                    return res.json();
                }),
                {
                    loading: "Sending...",
                    success: "Message sent successfully!",
                    error: (err) =>
                        err.message ||
                        "Failed to send message. Please try again.",
                    description: getDate,
                    position: "top-center",
                },
            );

            // Reset form after success
            setForm({ name: "", email: "", message: "" });
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="nav">Contact</Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md overflow-y-auto">
                <SheetHeader>
                    <SheetTitle className="text-2xl text-slate-50">
                        Contact Me
                    </SheetTitle>
                    <SheetDescription className="text-base">
                        Submit the form below and I'll get back to you as soon
                        as possible.
                    </SheetDescription>
                </SheetHeader>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 py-6"
                >
                    <div className="grid flex-1 auto-rows-min gap-6 px-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                placeholder="Pedro Duarte"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                placeholder="you@email.com"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                placeholder="I'd like to get in touch with you."
                                rows={4}
                                value={form.message}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <SheetFooter className="flex flex-col w-full items-center">
                        <Button
                            type="submit"
                            disabled={!isFormValid || isSubmitting}
                            className="text-foreground w-full hover:bg-accent hover:text-accent-foreground"
                        >
                            Send Message
                        </Button>
                        <SheetClose asChild>
                            <Button
                                variant="outline"
                                className="w-full max-w-sm hover:bg-accent-foreground hover:text-accent"
                            >
                                Close
                            </Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default ContactSheet;
