import {
    Search,
    CalendarDays,
    Video,
    BadgeCheck,
} from "lucide-react";

const steps = [
    {
        id: "01",
        icon: Search,
        title: "Find Your Mentor",
        description:
            "Browse verified mentors based on skills, company, expertise and ratings.",
    },
    {
        id: "02",
        icon: CalendarDays,
        title: "Book a Session",
        description:
            "Choose a suitable date, time slot and mentorship type that fits your schedule.",
    },
    {
        id: "03",
        icon: Video,
        title: "Connect & Learn",
        description:
            "Chat beforehand and join secure one-to-one video sessions for personalized guidance.",
    },
    {
        id: "04",
        icon: BadgeCheck,
        title: "Grow Your Career",
        description:
            "Receive practical advice, roadmap, interview preparation and continuous mentorship.",
    },
];

const HowItWorks = () => {
    return (
        <section className="bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                        Simple Process
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        How MentorBridge Works
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
                        Getting started takes only a few minutes. Find your mentor,
                        schedule a session and accelerate your career.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

                    {steps.map((step) => {

                        const Icon = step.icon;

                        return (

                            <div
                                key={step.id}
                                className="relative rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >

                                <span className="absolute right-6 top-6 text-5xl font-bold text-gray-100">
                                    {step.id}
                                </span>

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">

                                    <Icon
                                        size={26}
                                        className="text-indigo-600"
                                    />

                                </div>

                                <h3 className="mt-8 text-xl font-semibold text-gray-900">
                                    {step.title}
                                </h3>

                                <p className="mt-4 leading-7 text-gray-500">
                                    {step.description}
                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
};

export default HowItWorks;