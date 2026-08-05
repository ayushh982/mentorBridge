import {
    ShieldCheck,
    CalendarClock,
    MessageCircle,
    Video,
} from "lucide-react";

const features = [
    {
        icon: ShieldCheck,
        title: "Verified Mentors",
        description:
            "Every mentor is reviewed before joining the platform.",
    },
    {
        icon: CalendarClock,
        title: "Easy Session Booking",
        description:
            "Choose your preferred mentor, date and available time slot.",
    },
    {
        icon: MessageCircle,
        title: "Real-time Chat",
        description:
            "Connect with mentors instantly before or after your sessions.",
    },
    {
        icon: Video,
        title: "1-on-1 Video Calls",
        description:
            "Attend mentorship sessions through secure video meetings.",
    },
];

const WhyMentorBridge = () => {
    return (
        <section className="bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <h2 className="text-4xl font-bold text-gray-900">

                        Why Choose MentorBridge?

                    </h2>

                    <p className="mt-4 text-lg text-gray-500">

                        Everything you need to connect, learn and grow with experienced mentors.

                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {features.map((feature) => {

                        const Icon = feature.icon;

                        return (

                            <div
                                key={feature.title}
                                className="rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">

                                    <Icon
                                        className="text-indigo-600"
                                        size={26}
                                    />

                                </div>

                                <h3 className="mt-6 text-xl font-semibold">

                                    {feature.title}

                                </h3>

                                <p className="mt-3 leading-7 text-gray-500">

                                    {feature.description}

                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
};

export default WhyMentorBridge;