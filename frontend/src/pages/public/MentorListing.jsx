import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, Briefcase, MapPin } from "lucide-react";

import { getAllMentors } from "../../services/mentor.service";




const MentorListing = () => {

    const navigate = useNavigate();

    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [skill, setSkill] = useState("All Skills");
    const [sortBy, setSortBy] = useState("Sort By");

    useEffect(() => {

        const fetchMentors = async () => {

            try {

                const res = await getAllMentors();

                setMentors(res.data);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchMentors();

    }, []);
    if (loading) {
    return (
        <div className="flex h-[60vh] items-center justify-center">
            <h2 className="text-xl font-semibold">Loading mentors...</h2>
        </div>
    );
}

const filteredMentors = mentors
    .filter((mentor) => {

        const query = search.toLowerCase();

        const matchesSearch =
            mentor.user?.fullName?.toLowerCase().includes(query) ||
            mentor.company?.toLowerCase().includes(query) ||
            mentor.designation?.toLowerCase().includes(query) ||
            mentor.skills?.join(" ").toLowerCase().includes(query);

        const matchesSkill =
            skill === "All Skills" ||
            mentor.skills?.includes(skill);

        return matchesSearch && matchesSkill;
    })
    .sort((a, b) => {

        if (sortBy === "Highest Rating") {
            return (b.averageRating || 0) - (a.averageRating || 0);
        }

        if (sortBy === "Lowest Price") {
            return a.pricing - b.pricing;
        }

        return 0;
    });
    return (

        <section className="mx-auto max-w-7xl px-6 py-16">

            <div className="mb-12">

                <h1 className="text-4xl font-bold">
                    Find Your Mentor
                </h1>

                <p className="mt-3 text-gray-500">
                    Learn from experienced professionals from top companies.
                </p>

            </div>

            <div className="mb-10 grid gap-4 md:grid-cols-4">

                <div className="relative md:col-span-2">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search mentors..."
    className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-indigo-600"
/>

                </div>

                <select
    value={skill}
    onChange={(e) => setSkill(e.target.value)}
    className="rounded-xl border border-gray-200 px-4 py-3"
>
    <option>All Skills</option>
    <option>React</option>
    <option>Node.js</option>
    <option>Java</option>
    <option>C++</option>
    <option>MERN Stack</option>
    <option>Python Developer</option>
    <option>JAVA Developer</option>
</select>

                <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="rounded-xl border border-gray-200 px-4 py-3"
>
    <option>Sort By</option>
    <option>Highest Rating</option>
    <option>Lowest Price</option>
</select>

            </div>

            {filteredMentors.length === 0 ? (
    <div className="rounded-xl border border-dashed p-10 text-center">
        <h2 className="text-xl font-semibold">
            No mentors found
        </h2>
    </div>
) : (

            <div className="grid gap-8 lg:grid-cols-2">

                {filteredMentors.map((mentor) => (

                    <div
                        key={mentor._id}
                        className="rounded-3xl border border-gray-200 bg-white p-6 transition hover:shadow-lg"
                    >

                        <div className="flex gap-5">

                            <img
                                src={
    mentor.user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        mentor.user?.fullName || "User"
    )}&background=4F46E5&color=ffffff`
}
                                alt={mentor.user?.fullName}
                                className="h-24 w-24 rounded-full"
                            />

                            <div className="flex-1">

                                <div className="flex items-center justify-between">

                                    <h2 className="text-2xl font-semibold">
                                        {mentor.user?.fullName}
                                    </h2>

                                    <span className="rounded-xl bg-indigo-50 px-3 py-2 text-indigo-600">
                                        ₹{mentor.pricing}
                                    </span>

                                </div>

                                <p className="mt-2 text-gray-500">
                                    {mentor.designation}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-5 text-sm text-gray-500">

                                    <span className="flex items-center gap-2">

                                        <Briefcase size={16} />

                                        {mentor.company}

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <MapPin size={16} />

                                        {mentor.experience} Years

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <Star
                                            size={16}
                                            className="fill-yellow-400 text-yellow-400"
                                        />

                                        {mentor.averageRating ?? "New"}

                                    </span>

                                </div>

                                <div className="mt-5 flex flex-wrap gap-2">

                                    {mentor.skills?.map((skill) => (

                                        <span
                                            key={skill}
                                            className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600"
                                        >
                                            {skill}
                                        </span>

                                    ))}

                                </div>

                                <button
    onClick={() => navigate(`/mentors/${mentor._id}`)}
    className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
>
    View Profile
</button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>
            )}

        </section>

    );
};

export default MentorListing;