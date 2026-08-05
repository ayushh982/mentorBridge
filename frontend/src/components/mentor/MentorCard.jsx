import { Star, Briefcase, Clock } from "lucide-react";

const MentorCard = ({ mentor }) => {
    return (
        <div className="group rounded-3xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            <div className="flex items-center gap-4">

                <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="h-16 w-16 rounded-2xl object-cover"
                />

                <div>

                    <h3 className="text-lg font-semibold text-gray-900">
                        {mentor.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                        {mentor.role}
                    </p>

                </div>

            </div>

            <div className="mt-6 flex items-center gap-2">

                <Briefcase
                    size={16}
                    className="text-indigo-600"
                />

                <span className="text-sm text-gray-600">
                    {mentor.company}
                </span>

            </div>

            <div className="mt-3 flex items-center gap-2">

                <Clock
                    size={16}
                    className="text-indigo-600"
                />

                <span className="text-sm text-gray-600">
                    {mentor.experience} Years Experience
                </span>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

                {mentor.skills.map((skill) => (

                    <span
                        key={skill}
                        className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
                    >
                        {skill}
                    </span>

                ))}

            </div>

            <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-1">

                    <Star
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold">

                        {mentor.rating}

                    </span>

                </div>

                <span className="text-xl font-bold text-gray-900">

                    ₹{mentor.price}

                </span>

            </div>

            <button className="mt-6 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700">

                View Profile

            </button>

        </div>
    );
};

export default MentorCard;