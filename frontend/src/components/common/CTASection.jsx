import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTASection = () => {
    return (
        <section className="bg-indigo-600">

            <div className="mx-auto max-w-7xl px-6 py-24">

                <div className="mx-auto max-w-3xl text-center">

                    <span className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-indigo-100">
                        Start Your Journey Today
                    </span>

                    <h2 className="mt-6 text-5xl font-bold leading-tight text-white">

                        Learn Faster With The Right Mentor

                    </h2>

                    <p className="mt-6 text-lg leading-8 text-indigo-100">

                        Connect with experienced professionals, prepare for
                        interviews, improve your resume and accelerate your
                        career with one-on-one mentorship.

                    </p>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">

                        <Link
                            to="/register"
                            className="flex items-center gap-2 rounded-xl bg-white px-7 py-3 font-medium text-indigo-600 transition hover:bg-gray-100"
                        >

                            Get Started

                            <ArrowRight size={18} />

                        </Link>

                        <Link
                            to="/mentors"
                            className="rounded-xl border border-white/30 px-7 py-3 font-medium text-white transition hover:bg-white/10"
                        >

                            Browse Mentors

                        </Link>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default CTASection;