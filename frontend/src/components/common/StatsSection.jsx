import {
    Users,
    GraduationCap,
    CalendarCheck,
    Star,
} from "lucide-react";

const stats = [
    {
        icon: Users,
        value: "5,000+",
        label: "Students Guided",
    },
    {
        icon: GraduationCap,
        value: "500+",
        label: "Verified Mentors",
    },
    {
        icon: CalendarCheck,
        value: "10,000+",
        label: "Sessions Completed",
    },
    {
        icon: Star,
        value: "4.9/5",
        label: "Average Rating",
    },
];

const StatsSection = () => {
    return (
        <section className="bg-white">

            <div className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                        Platform Impact
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        Trusted by Thousands of Students
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
                        MentorBridge helps students connect with experienced professionals
                        and build confidence for placements and career growth.
                    </p>

                </div>

                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                    {stats.map((item) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.label}
                                className="rounded-3xl border border-gray-200 bg-white p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-md"
                            >

                                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50">

                                    <Icon
                                        size={30}
                                        className="text-indigo-600"
                                    />

                                </div>

                                <h3 className="mt-6 text-4xl font-bold text-gray-900">
                                    {item.value}
                                </h3>

                                <p className="mt-3 text-gray-500">
                                    {item.label}
                                </p>

                            </div>

                        );

                    })}

                </div>

            </div>

        </section>
    );
};

export default StatsSection;