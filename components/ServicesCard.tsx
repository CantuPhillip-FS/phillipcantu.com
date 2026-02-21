import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

const ServicesCard = ({
    title,
    tagline,
    description,
    features,
}: {
    title: string;
    tagline?: string;
    description: string;
    features?: string[];
}) => {
    return (
        <Card className="flex h-full w-full max-w-sm flex-col bg-accent-foreground hover:bg-foreground/65">
            <CardHeader>
                <CardTitle className="text-accent text-xl text-center">
                    {title}
                </CardTitle>
                <CardDescription className="min-h-6">{tagline}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-4">
                <p className="text-accent">{description}</p>

                {features && (
                    <div className="mt-auto">
                        <p className="text-accent font-bold mb-2">
                            What you get:
                        </p>
                        <ul className="space-y-1">
                            {features.map((feature, index) => (
                                <li
                                    key={index}
                                    className="text-accent list-disc ml-5"
                                >
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ServicesCard;
