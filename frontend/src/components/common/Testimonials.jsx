import { Star } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "Ayush Sharma",
        role: "CSE Student",
        company: "UIT RGPV",
        image: "https://i.pravatar.cc/150?img=12",
        review:
            "The mentorship sessions helped me prepare for technical interviews with confidence. The guidance was practical and easy to follow.",
    },
    {
        id: 2,
        name: "Priya Verma",
        role: "Final Year Student",
        company: "NIT Bhopal",
        image: "https://i.pravatar.cc/150?img=25",
        review:
            "I improved my resume, solved DSA problems with my mentor and finally secured an internship. Highly recommended.",
    },
    {
        id: 3,
        name: "Rahul Singh",
        role: "Software Engineer",
        company: "TCS",
        image: "https://i.pravatar.cc/150?img=18",
        review:
            "MentorBridge creates meaningful mentor-student connections. The platform is simple, fast and easy to use.",
    },
];

const Testimonials = () => {
    return (
        <section className="bg-slate-50">

            <div className="mx-auto max-w-7xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                        Testimonials
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        What Our Students Say
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
                        Real experiences from students who have learned from experienced mentors.
                    </p>

                </div>

                <div className="mt-16 grid gap-8 lg:grid-cols-3">

                    {testimonials.map((item) => (

                        <div
                            key={item.id}
                            className="rounded-3xl border border-gray-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-md"
                        >

                            <div className="flex items-center gap-4">

                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-14 w-14 rounded-full object-cover"
                                />

                                <div>

                                    <h3 className="font-semibold text-gray-900">
                                        {item.name}
                                    </h3>

                                    <p className="text-sm text-gray-500">
                                        {item.role}
                                    </p>

                                    <p className="text-sm text-indigo-600">
                                        {item.company}
                                    </p>

                                </div>

                            </div>

                            <div className="mt-5 flex">

                                {[...Array(5)].map((_, index) => (

                                    <Star
                                        key={index}
                                        size={18}
                                        className="fill-yellow-400 text-yellow-400"
                                    />

                                ))}

                            </div>

                            <p className="mt-6 leading-8 text-gray-600">
                                "{item.review}"
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default Testimonials;