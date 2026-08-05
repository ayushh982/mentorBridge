import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    CheckCircle,
    XCircle,
    BriefcaseBusiness,
    Building2,
} from "lucide-react";

import {
    getPendingMentors,
    approveMentor,
    rejectMentor,
} from "../../services/admin.service";

const PendingMentors = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingMentors = async () => {
        try {
            const data = await getPendingMentors();
            setMentors(data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load pending mentors.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingMentors();
    }, []);

    const handleApprove = async (mentorId) => {
        try {
            await approveMentor(mentorId);

            setMentors((prev) =>
                prev.filter((mentor) => mentor._id !== mentorId)
            );

            toast.success("Mentor approved successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to approve mentor.");
        }
    };

    const handleReject = async (mentorId) => {
        try {
            await rejectMentor(mentorId);

            setMentors((prev) =>
                prev.filter((mentor) => mentor._id !== mentorId)
            );

            toast.success("Mentor rejected successfully.");
        } catch (error) {
            console.error(error);
            toast.error("Failed to reject mentor.");
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center text-lg">
                Loading pending mentors...
            </div>
        );
    }

    return (
        <section>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Pending Mentors
                </h1>

                <p className="mt-2 text-gray-500">
                    Review mentor profiles and approve or reject them.
                </p>

            </div>

            {mentors.length === 0 ? (

                <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
                    No pending mentor requests.
                </div>

            ) : (

                <div className="grid gap-6">

                    {mentors.map((mentor) => (

                        <div
                            key={mentor._id}
                            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm"
                        >

                            <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">

                                {/* Left */}

                                <div className="flex-1">

                                    <h2 className="text-2xl font-semibold">
                                        {mentor.user?.fullName}
                                    </h2>

                                    <p className="mt-1 text-gray-500">
                                        {mentor.user?.email}
                                    </p>

                                    {mentor.profileHeadline && (
                                        <p className="mt-4 text-indigo-600 font-medium">
                                            {mentor.profileHeadline}
                                        </p>
                                    )}

                                    {mentor.bio && (
                                        <p className="mt-3 text-gray-600">
                                            {mentor.bio}
                                        </p>
                                    )}

                                    <div className="mt-6 grid gap-4 md:grid-cols-2">

                                        <div className="flex items-center gap-2">
                                            <Building2
                                                size={18}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                {mentor.company || "-"}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <BriefcaseBusiness
                                                size={18}
                                                className="text-indigo-600"
                                            />
                                            <span>
                                                {mentor.designation || "-"}
                                            </span>
                                        </div>

                                        <div>
                                            <span className="font-medium">
                                                Experience :
                                            </span>{" "}
                                            {mentor.experience} Years
                                        </div>

                                        <div>
                                            <span className="font-medium">
                                                Session Price :
                                            </span>{" "}
                                            ₹{mentor.pricing}
                                        </div>

                                    </div>

                                    {mentor.skills?.length > 0 && (

                                        <div className="mt-6 flex flex-wrap gap-2">

                                            {mentor.skills.map((skill) => (

                                                <span
                                                    key={skill}
                                                    className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700"
                                                >
                                                    {skill}
                                                </span>

                                            ))}

                                        </div>

                                    )}

                                    <div className="mt-6 flex flex-wrap gap-6">

    {mentor.linkedin && (
        <a
            href={mentor.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
        >
            LinkedIn Profile
        </a>
    )}

    {mentor.github && (
        <a
            href={mentor.github}
            target="_blank"
            rel="noreferrer"
            className="text-gray-700 hover:underline"
        >
            GitHub Profile
        </a>
    )}

</div>

                                </div>

                                {/* Right */}

                                <div className="flex flex-col justify-center gap-4">

                                    <button
                                        onClick={() =>
                                            handleApprove(mentor._id)
                                        }
                                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 text-white transition hover:bg-green-700"
                                    >
                                        <CheckCircle size={18} />
                                        Approve
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleReject(mentor._id)
                                        }
                                        className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 text-white transition hover:bg-red-700"
                                    >
                                        <XCircle size={18} />
                                        Reject
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

export default PendingMentors;