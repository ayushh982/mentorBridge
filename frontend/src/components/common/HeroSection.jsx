import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
    return (
        <section className="bg-white">

            <div className="mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center justify-between gap-16 px-6 py-20 lg:flex-row">

                {/* Left */}

                <div className="max-w-xl">

                    <span className="rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">

                        Trusted by Students & Industry Mentors

                    </span>

                    <h1 className="mt-8 text-5xl font-bold leading-tight text-gray-900">

                        Learn From People

                        <span className="text-indigo-600">

                            {" "}Who've Already Done It

                        </span>

                    </h1>

                    <p className="mt-6 text-lg leading-8 text-gray-500">

                        Connect with verified professionals, alumni and industry experts for
                        career guidance, mock interviews, resume reviews and placement
                        preparation.

                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Link
                            to="/mentors"
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700"
                        >
                            Find Mentor

                            <ArrowRight size={18} />

                        </Link>

                        <button className="flex items-center gap-2 rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-50">

                            <PlayCircle size={18} />

                            Watch Demo

                        </button>

                    </div>

                    <div className="mt-14 flex gap-10">

                        <div>

                            <h3 className="text-3xl font-bold text-gray-900">

                                500+

                            </h3>

                            <p className="mt-1 text-gray-500">

                                Mentors

                            </p>

                        </div>

                        <div>

                            <h3 className="text-3xl font-bold text-gray-900">

                                5K+

                            </h3>

                            <p className="mt-1 text-gray-500">

                                Students

                            </p>

                        </div>

                        <div>

                            <h3 className="text-3xl font-bold text-gray-900">

                                4.9★

                            </h3>

                            <p className="mt-1 text-gray-500">

                                Average Rating

                            </p>

                        </div>

                    </div>

                </div>

                {/* Right */}

                <div className="relative w-full max-w-xl">

                    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                        <img
                            src="https://placehold.co/700x520/F8FAFC/6366F1?text=MentorBridge+Dashboard"
                            alt="Dashboard"
                            className="rounded-2xl"
                        />

                    </div>

                    <div className="absolute -left-6 top-10 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                        <p className="text-sm font-semibold">

                            ⭐ 4.9 Rating

                        </p>

                        <p className="mt-1 text-xs text-gray-500">

                            2,000+ Reviews

                        </p>

                    </div>

                    <div className="absolute -right-5 bottom-12 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">

                        <p className="text-sm font-semibold">

                            120 Sessions Today

                        </p>

                        <p className="mt-1 text-xs text-gray-500">

                            Live Mentorship

                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default HeroSection;