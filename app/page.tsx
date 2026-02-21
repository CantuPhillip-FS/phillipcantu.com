import Hero from "@/components/Hero";
import ServicesCard from "@/components/ServicesCard";
export default function Home() {
    return (
        <div className="flex flex-col items-center">
            <Hero />
            <section>
                <h2 className="text-2xl font-bold text-center my-6 text-accent">
                    My Services
                </h2>
                <div className="grid gap-6 md:grid-cols-2 items-stretch">
                    <ServicesCard
                        title="Custom Business Websites"
                        tagline="A site you actually own, easy-to-update content, and a
                    design that matches your brand."
                        description={`Stop losing customers to a "broken" Google listing. I build modern, fast-loading websites that look beautiful on phones and computers. Whether you need an online shop for your bookstore or a professional landing page for your services, I handle the technical "headaches" so you can focus on your customers.`}
                        features={[
                            "Mobile-friendly design",
                            "Fast loading times",
                            "SEO optimization",
                            "Easy content management",
                        ]}
                    />
                    <ServicesCard
                        title={`Website "Rescue" & Refreshes`}
                        tagline={`Better security, faster loading speeds, and a modern "face" for your business.`}
                        description={`Is your current website outdated, slow, or just not working? I specialize in "rescuing" struggling websites by fixing technical issues, improving design, and optimizing performance. Whether your site is broken or just needs a refresh, I can help you get back online and attract customers again.`}
                        features={[
                            "Technical troubleshooting",
                            "Design updates",
                            "Performance optimization",
                            "Content refreshes",
                        ]}
                    />
                </div>
            </section>
        </div>
    );
}
