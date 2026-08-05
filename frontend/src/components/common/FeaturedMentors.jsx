import MentorCard from "../mentor/MentorCard";

const mentors = [

    {
        id: 1,
        name: "Rahul Sharma",
        role: "Software Engineer",
        company: "Google",
        experience: 5,
        rating: 4.9,
        price: 499,
        skills: ["React", "Node", "DSA"],
        image: "https://i.pravatar.cc/150?img=1",
    },

    {
        id: 2,
        name: "Ananya Singh",
        role: "SDE II",
        company: "Microsoft",
        experience: 4,
        rating: 4.8,
        price: 399,
        skills: ["Java", "Spring", "System Design"],
        image: "https://i.pravatar.cc/150?img=5",
    },

    {
        id: 3,
        name: "Aman Verma",
        role: "Backend Engineer",
        company: "Amazon",
        experience: 6,
        rating: 5.0,
        price: 599,
        skills: ["Node", "MongoDB", "AWS"],
        image: "https://i.pravatar.cc/150?img=11",
    },

];

const FeaturedMentors = () => {

    return (

        <section className="bg-white">

            <div className="mx-auto max-w-7xl px-6 py-24">

                <div className="flex items-end justify-between">

                    <div>

                        <h2 className="text-4xl font-bold">

                            Featured Mentors

                        </h2>

                        <p className="mt-4 text-gray-500">

                            Learn from professionals working at top companies.

                        </p>

                    </div>

                    <button className="hidden rounded-xl border border-gray-200 px-5 py-3 transition hover:bg-gray-50 md:block">

                        View All

                    </button>

                </div>

                <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">

                    {mentors.map((mentor) => (

                        <MentorCard
                            key={mentor.id}
                            mentor={mentor}
                        />

                    ))}

                </div>

            </div>

        </section>

    );

};

export default FeaturedMentors;