import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "Who can become a mentor?",
        answer:
            "Working professionals, alumni and experienced developers can register as mentors. Every profile is verified before it becomes public.",
    },
    {
        question: "Can I book free mentorship sessions?",
        answer:
            "Yes. Mentors can choose to offer free or paid sessions. Students can filter mentors based on pricing.",
    },
    {
        question: "How are mentors verified?",
        answer:
            "Our admin team reviews every mentor's profile, work experience and professional details before approving the account.",
    },
    {
        question: "How are mentorship sessions conducted?",
        answer:
            "Sessions are conducted through secure one-to-one video calls integrated directly into the platform.",
    },
    {
        question: "Can I chat with my mentor before booking?",
        answer:
            "Yes. Once a booking is confirmed, students and mentors can communicate using the built-in chat feature.",
    },
];

const FAQ = () => {

    const [activeIndex, setActiveIndex] = useState(0);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-white">

            <div className="mx-auto max-w-5xl px-6 py-24">

                <div className="text-center">

                    <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                        FAQ
                    </span>

                    <h2 className="mt-6 text-4xl font-bold text-gray-900">
                        Frequently Asked Questions
                    </h2>

                    <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-500">
                        Everything you need to know before starting your mentorship journey.
                    </p>

                </div>

                <div className="mt-16 space-y-5">

                    {faqs.map((faq, index) => (

                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white transition-all"
                        >

                            <button
                                onClick={() => toggleFAQ(index)}
                                className="flex w-full items-center justify-between px-6 py-5 text-left"
                            >

                                <span className="text-lg font-medium text-gray-900">

                                    {faq.question}

                                </span>

                                <ChevronDown
                                    size={22}
                                    className={`transition-transform duration-300 ${
                                        activeIndex === index
                                            ? "rotate-180 text-indigo-600"
                                            : ""
                                    }`}
                                />

                            </button>

                            {activeIndex === index && (

                                <div className="border-t border-gray-100 px-6 py-5">

                                    <p className="leading-8 text-gray-500">

                                        {faq.answer}

                                    </p>

                                </div>

                            )}

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default FAQ;