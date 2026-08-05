import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
    getMyMentorProfile,
    updateMentorProfile,
} from "../../services/mentor.service";

const CompleteProfile = () => {

    const {
        register,
        handleSubmit,
        setValue,
    } = useForm();

    const navigate = useNavigate();

    useEffect(() => {

        const fetchProfile = async () => {

            try {

                const res = await getMyMentorProfile();

                const profile = res.data;

                if (!profile) return;

                setValue("company", profile.company || "");
                setValue("designation", profile.designation || "");
                setValue("experience", profile.experience || "");
                setValue("pricing", profile.pricing || "");
                setValue("bio", profile.bio || "");
                setValue("linkedin", profile.linkedin || "");
                setValue("github", profile.github || "");
                setValue(
                    "skills",
                    profile.skills?.join(", ") || ""
                );

            } catch (error) {
                console.log(error);
            }

        };

        fetchProfile();

    }, [setValue]);

    const onSubmit = async (data) => {

        try {

            data.skills = data.skills
                .split(",")
                .map((skill) => skill.trim());

            await updateMentorProfile(data);

            toast.success("Profile Updated Successfully");

            navigate("/mentor/dashboard");

        } catch (error) {

            console.log(error);

            toast.error("Failed to Update Profile");

        }

    };



    return (

        <section>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Complete Mentor Profile
                </h1>

                <p className="mt-2 text-gray-500">
                    Complete your profile to start accepting mentorship sessions.
                </p>

            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

            {/* Basic Information */}
            <div className="rounded-2xl bg-white shadow-sm border p-6">
                <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Company Name
                        </label>
                        <input
                            {...register("company")}
                            type="text"
                            placeholder="e.g. Microsoft"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Designation
                        </label>
                        <input
                            {...register("designation")}
                            type="text"
                            placeholder="e.g. Software Engineer"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Years of Experience
                        </label>
                        <input
                            {...register("experience")}
                            type="number"
                            placeholder="2"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Session Price (₹)
                        </label>
                        <input
                            {...register("pricing")}
                            type="number"
                            placeholder="500"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                </div>
            </div>

            {/* Professional Details */}
            <div className="rounded-2xl bg-white shadow-sm border p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Professional Details
                </h2>

                <div className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Professional Headline
                        </label>
                        <input
                            {...register("profileHeadline")}
                            type="text"
                            placeholder="Software Engineer at Google | MERN Developer"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Bio
                        </label>
                        <textarea
                            {...register("bio")}
                            rows={5}
                            placeholder="Tell students about yourself..."
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Skills
                        </label>
                        <textarea
                            {...register("skills")}
                            rows={3}
                            placeholder="React, Node.js, MongoDB, Express"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                </div>

            </div>

            {/* Social Profiles */}
            <div className="rounded-2xl bg-white shadow-sm border p-6">

                <h2 className="text-xl font-semibold">
                    Social Profiles
                </h2>

                <p className="text-sm text-gray-500 mt-2 mb-6">
                    These links will be reviewed by the admin during mentor verification.
                </p>

                <div className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            LinkedIn Profile URL
                        </label>
                        <input
                            {...register("linkedin")}
                            type="url"
                            placeholder="https://linkedin.com/in/username"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            GitHub Profile URL
                        </label>
                        <input
                            {...register("github")}
                            type="url"
                            placeholder="https://github.com/username"
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                </div>

            </div>

            {/* Mentorship Details */}
            <div className="rounded-2xl bg-white shadow-sm border p-6">

                <h2 className="text-xl font-semibold mb-6">
                    Mentorship Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Session Duration
                        </label>

                        <select
                            {...register("sessionDuration")}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="30">30 Minutes</option>
                            <option value="60">60 Minutes</option>
                            <option value="90">90 Minutes</option>
                        </select>

                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Free Mentorship
                        </label>

                        <select
                            {...register("isFreeMentorship")}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>

                    </div>

                </div>

            </div>

            {/* Submit Button */}
            <div className="flex justify-end">

                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition"
                >
                    Save & Submit for Verification
                </button>

            </div>

        </form>

        </section>

    );

};

export default CompleteProfile;