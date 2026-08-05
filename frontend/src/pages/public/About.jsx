const About = () => {
    return (

        <section className="mx-auto max-w-6xl px-6 py-20">

            <h1 className="text-5xl font-bold">
                About MentorBridge
            </h1>

            <p className="mt-8 leading-8 text-gray-600">

                MentorBridge connects students with experienced mentors from
                top companies to help them prepare for placements, interviews,
                career guidance and technical skills.

            </p>

            <div className="mt-16 grid gap-8 md:grid-cols-3">

                <div className="rounded-3xl border border-gray-200 p-8">

                    <h2 className="text-xl font-semibold">
                        500+
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Verified Mentors
                    </p>

                </div>

                <div className="rounded-3xl border border-gray-200 p-8">

                    <h2 className="text-xl font-semibold">
                        10K+
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Sessions Completed
                    </p>

                </div>

                <div className="rounded-3xl border border-gray-200 p-8">

                    <h2 className="text-xl font-semibold">
                        4.9★
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Average Rating
                    </p>

                </div>

            </div>

        </section>

    );
};

export default About;