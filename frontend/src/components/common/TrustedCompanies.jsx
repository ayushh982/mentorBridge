const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Adobe",
    "Infosys",
    "TCS",
];

const TrustedCompanies = () => {
    return (
        <section className="border-y border-gray-100 bg-white">

            <div className="mx-auto max-w-7xl px-6 py-12">

                <p className="text-center text-sm font-medium uppercase tracking-wider text-gray-400">

                    Mentors from Leading Companies

                </p>

                <div className="mt-10 grid grid-cols-2 gap-8 text-center md:grid-cols-3 lg:grid-cols-6">

                    {companies.map((company) => (

                        <div
                            key={company}
                            className="rounded-2xl border border-gray-100 py-5 text-lg font-semibold text-gray-700 transition hover:border-indigo-100 hover:text-indigo-600"
                        >
                            {company}
                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
};

export default TrustedCompanies;