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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

const ContactSheet = () => {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

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
            // TODO: Replace with your API route or email service
            console.log("Form submitted:", form);

            // Reset form
            setForm({ name: "", email: "", message: "" });
            // toast.success("Message sent successfully!", {
            //     description: getDate,
            // });
            toast.promise(
                () =>
                    new Promise<void>((resolve) =>
                        setTimeout(() => resolve(), 2000),
                    ),
                {
                    loading: "Sending...",
                    success: () => "Message sent successfully!",
                    error: "Error",
                    description: getDate,
                    position: "top-center",
                },
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to send message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button>Contact</Button>
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
                    <SheetFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    <Spinner className="h-4 w-4 mr-2" />
                                    Sending...
                                </>
                            ) : (
                                "Send Message"
                            )}
                        </Button>
                        <SheetClose asChild>
                            <Button variant="outline">Close</Button>
                        </SheetClose>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default ContactSheet;
