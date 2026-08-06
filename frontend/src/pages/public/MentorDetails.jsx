import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    Star,
    Briefcase,
    Clock,
    CalendarDays,
    IndianRupee,
} from "lucide-react";
import { useLocation } from "react-router-dom";

import { getMentorById } from "../../services/mentor.service";

const MentorDetails = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);
    
    const location = useLocation();

    const isStudentPage = location.pathname.startsWith("/student");

    useEffect(() => {

    const fetchMentor = async () => {

        try {

            const res = await getMentorById(id);

            console.log("Mentor Details Response:", res);

            setMentor(res.data);

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    };

    fetchMentor();

}, [id]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Loading Mentor...
                </h2>
            </div>
        );
    }

    if (!mentor) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <h2 className="text-xl font-semibold">
                    Mentor not found
                </h2>
            </div>
        );
    }

    return (

        <section className="mx-auto max-w-7xl px-6 py-16">

            <div className="grid gap-10 lg:grid-cols-3">

                <div className="rounded-3xl border border-gray-200 bg-white p-8">

                    <img
                        src={
    mentor.user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        mentor.user?.fullName || "User"
    )}&background=4F46E5&color=ffffff`
}
                        alt={mentor.user?.fullName}
                        className="mx-auto h-40 w-40 rounded-full"
                    />

                    <h1 className="mt-6 text-center text-3xl font-bold">
                        {mentor.user?.fullName}
                    </h1>

                    <p className="mt-2 text-center text-gray-500">
                        {mentor.designation}
                    </p>

                    <div className="mt-6 flex justify-center gap-6">

                        <span className="flex items-center gap-2">
                            <Star
                                size={18}
                                className="fill-yellow-400 text-yellow-400"
                            />
                            {mentor.averageRating ?? "New"}
                        </span>

                        <span className="flex items-center gap-2">
                            <Briefcase size={18} />
                            {mentor.company}
                        </span>

                    </div>

                    {isStudentPage && (
                        <button
                            onClick={() =>
                                navigate(`/student/book-session/${mentor._id}`)
                            }
                            className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-white hover:bg-indigo-700"
                        >
                            Book Session
                        </button>
                    )}

                </div>

                <div className="space-y-8 lg:col-span-2">

                    <div className="rounded-3xl border border-gray-200 bg-white p-8">

                        <h2 className="text-2xl font-semibold">
                            About
                        </h2>

                        <p className="mt-5 leading-8 text-gray-600">
                            {mentor.bio}
                        </p>

                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-8">

                        <h2 className="text-2xl font-semibold">
                            Skills
                        </h2>

                        <div className="mt-6 flex flex-wrap gap-3">

                            {mentor.skills?.map((skill) => (

                                <span
                                    key={skill}
                                    className="rounded-full bg-indigo-50 px-4 py-2 text-indigo-600"
                                >
                                    {skill}
                                </span>

                            ))}

                        </div>

                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-8">

                        <h2 className="text-2xl font-semibold">
                            Session Details
                        </h2>

                        <div className="mt-6 grid gap-5 md:grid-cols-3">

                            <div className="flex gap-3">

                                <Clock className="text-indigo-600" />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Duration
                                    </p>

                                    <p>
                                        {mentor.sessionDuration} Minutes
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3">

                                <CalendarDays className="text-indigo-600" />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Availability
                                    </p>

                                    <p>
                                        {mentor.availability?.length || 0} Slots
                                    </p>

                                </div>

                            </div>

                            <div className="flex gap-3">

                                <IndianRupee className="text-indigo-600" />

                                <div>

                                    <p className="text-sm text-gray-500">
                                        Price
                                    </p>

                                    <p>
                                        ₹{mentor.pricing}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default MentorDetails;