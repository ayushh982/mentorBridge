import { useEffect, useState } from "react";
import {
    Mail,
    Briefcase,
    Building2,
    Star,
    Pencil,
} from "lucide-react";
import { toast } from "react-toastify";
import { getMyMentorProfile } from "../../services/mentor.service";

const MentorProfile = () => {

    const [mentor, setMentor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getMyMentorProfile();
            setMentor(res.data);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch profile"
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-80 items-center justify-center">
                <p className="text-lg text-gray-500">
                    Loading profile...
                </p>
            </div>
        );
    }

    if (!mentor) {
        return (
            <div className="flex h-80 items-center justify-center">
                <p className="text-lg text-red-500">
                    Profile not found.
                </p>
            </div>
        );
    }

    return (
        <section>

            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        My Profile
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your mentor profile.
                    </p>

                </div>

                <button
                    onClick={() =>
                        toast.info("Edit Profile coming soon!")
                    }
                    className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                >
                    <Pencil size={18} />
                    Edit Profile
                </button>

            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">

                {/* Left Card */}

                <div className="rounded-3xl border border-gray-200 bg-white p-8">

                    <img
                        src={
    mentor.user?.avatar ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
        mentor.user?.fullName || "User"
    )}&background=4F46E5&color=ffffff`
}
                        alt="mentor"
                        className="mx-auto h-36 w-36 rounded-full object-cover"
                    />

                    <h2 className="mt-6 text-center text-2xl font-bold">
                        {mentor.user?.fullName}
                    </h2>

                    <p className="mt-2 text-center text-gray-500">
                        {mentor.designation}
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-2">

                        <Star
                            size={18}
                            className="fill-yellow-400 text-yellow-400"
                        />

                        <span className="font-semibold">
                            5.0
                        </span>

                    </div>

                </div>

                {/* Right Card */}

                <div className="rounded-3xl border border-gray-200 bg-white p-8 lg:col-span-2">

                    <h2 className="text-2xl font-semibold">
                        Professional Information
                    </h2>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div className="flex gap-4">

                            <Mail className="text-indigo-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p>
                                    {mentor.user?.email}
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <Building2 className="text-indigo-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Company
                                </p>

                                <p>
                                    {mentor.company || "-"}
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <Briefcase className="text-indigo-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Experience
                                </p>

                                <p>
                                    {mentor.experience} Years
                                </p>

                            </div>

                        </div>

                        <div className="flex gap-4">

                            <Briefcase className="text-indigo-600" />

                            <div>

                                <p className="text-sm text-gray-500">
                                    Session Fee
                                </p>

                                <p>
                                    ₹{mentor.pricing}
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="mt-10">

                        <h3 className="text-lg font-semibold">
                            About
                        </h3>

                        <p className="mt-3 leading-8 text-gray-600">

                            {mentor.bio || "No bio available."}

                        </p>

                    </div>

                    <div className="mt-10">

                        <h3 className="text-lg font-semibold">
                            Skills
                        </h3>

                        <div className="mt-4 flex flex-wrap gap-3">

                            {mentor.skills?.length > 0 ? (

                                mentor.skills.map((skill, index) => (

                                    <span
                                        key={index}
                                        className="rounded-full bg-indigo-50 px-4 py-2 text-sm text-indigo-600"
                                    >
                                        {skill}
                                    </span>

                                ))

                            ) : (

                                <span className="text-gray-500">
                                    No skills added.
                                </span>

                            )}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default MentorProfile;