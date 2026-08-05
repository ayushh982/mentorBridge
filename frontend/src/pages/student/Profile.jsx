import { useEffect, useState } from "react";
import {
    Mail,
    User,
    ShieldCheck,
    Calendar,
    Pencil,
} from "lucide-react";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../services/auth.service";

const StudentProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const res = await getCurrentUser();
            setUser(res.data);
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

    if (!user) {
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
                        Manage your account information.
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
                            user.avatar ||
                            "https://i.pravatar.cc/200"
                        }
                        alt="student"
                        className="mx-auto h-36 w-36 rounded-full object-cover"
                    />

                    <h2 className="mt-6 text-center text-2xl font-bold">
                        {user.fullName}
                    </h2>

                    <p className="mt-2 text-center text-gray-500 capitalize">
                        {user.role}
                    </p>

                </div>

                {/* Right Card */}

                <div className="rounded-3xl border border-gray-200 bg-white p-8 lg:col-span-2">

                    <h2 className="text-2xl font-semibold">
                        Account Information
                    </h2>

                    <div className="mt-8 grid gap-6 md:grid-cols-2">

                        <div className="flex gap-4">
                            <Mail className="text-indigo-600" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p>{user.email}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <User className="text-indigo-600" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Role
                                </p>

                                <p className="capitalize">
                                    {user.role}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <ShieldCheck className="text-indigo-600" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Account Status
                                </p>

                                <p
                                    className={
                                        user.isActive
                                            ? "text-green-600 font-medium"
                                            : "text-red-600 font-medium"
                                    }
                                >
                                    {user.isActive
                                        ? "Active"
                                        : "Inactive"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <ShieldCheck className="text-indigo-600" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Email Verification
                                </p>

                                <p
                                    className={
                                        user.isVerified
                                            ? "text-green-600 font-medium"
                                            : "text-yellow-600 font-medium"
                                    }
                                >
                                    {user.isVerified
                                        ? "Verified"
                                        : "Not Verified"}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Calendar className="text-indigo-600" />

                            <div>
                                <p className="text-sm text-gray-500">
                                    Member Since
                                </p>

                                <p>
                                    {new Date(
                                        user.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="mt-10 rounded-2xl bg-indigo-50 p-6">

                        <h3 className="text-lg font-semibold text-indigo-700">
                            Welcome 👋
                        </h3>

                        <p className="mt-3 leading-7 text-gray-600">
                            Keep your profile up to date to get the
                            best mentorship experience. Browse mentors,
                            book sessions, and grow your career with
                            personalized guidance.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
};

export default StudentProfile;

// import {
//     Mail,
//     Phone,
//     MapPin,
//     GraduationCap,
//     Pencil,
// } from "lucide-react";

// const Profile = () => {
//     return (

//         <section>

//             <div className="flex items-center justify-between">

//                 <div>

//                     <h1 className="text-3xl font-bold">
//                         My Profile
//                     </h1>

//                     <p className="mt-2 text-gray-500">
//                         Manage your personal information.
//                     </p>

//                 </div>

//                 <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700">

//                     <Pencil size={18} />

//                     Edit Profile

//                 </button>

//             </div>

//             <div className="mt-10 grid gap-8 lg:grid-cols-3">

//                 <div className="rounded-3xl border border-gray-200 bg-white p-8">

//                     <img
//                         src="https://i.pravatar.cc/200?img=15"
//                         alt="profile"
//                         className="mx-auto h-36 w-36 rounded-full"
//                     />

//                     <h2 className="mt-6 text-center text-2xl font-bold">
//                         Ayush Tiwari
//                     </h2>

//                     <p className="mt-2 text-center text-gray-500">
//                         Computer Science Student
//                     </p>

//                 </div>

//                 <div className="rounded-3xl border border-gray-200 bg-white p-8 lg:col-span-2">

//                     <h2 className="text-2xl font-semibold">
//                         Personal Information
//                     </h2>

//                     <div className="mt-8 grid gap-6 md:grid-cols-2">

//                         <div className="flex gap-4">

//                             <Mail className="text-indigo-600" />

//                             <div>

//                                 <p className="text-sm text-gray-500">
//                                     Email
//                                 </p>

//                                 <p>
//                                     ayush@gmail.com
//                                 </p>

//                             </div>

//                         </div>

//                         <div className="flex gap-4">

//                             <Phone className="text-indigo-600" />

//                             <div>

//                                 <p className="text-sm text-gray-500">
//                                     Phone
//                                 </p>

//                                 <p>
//                                     +91 9876543210
//                                 </p>

//                             </div>

//                         </div>

//                         <div className="flex gap-4">

//                             <MapPin className="text-indigo-600" />

//                             <div>

//                                 <p className="text-sm text-gray-500">
//                                     Location
//                                 </p>

//                                 <p>
//                                     Bhopal, MP
//                                 </p>

//                             </div>

//                         </div>

//                         <div className="flex gap-4">

//                             <GraduationCap className="text-indigo-600" />

//                             <div>

//                                 <p className="text-sm text-gray-500">
//                                     College
//                                 </p>

//                                 <p>
//                                     UIT RGPV
//                                 </p>

//                             </div>

//                         </div>

//                     </div>

//                 </div>

//             </div>

//         </section>

//     );
// };

// export default Profile;