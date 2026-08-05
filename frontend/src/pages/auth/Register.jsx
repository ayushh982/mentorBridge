import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { registerUser } from "../../services/auth.service";

const Register = () => {

    const {
        register,
        handleSubmit,
        watch,
    } = useForm();

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const role = watch("role", "student");

    const onSubmit = async (formData) => {

        setIsLoading(true);

        try {

            const res = await registerUser(formData);

            toast.success(res.message);

            navigate("/login");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Registration failed"
            );

        } finally {

            setIsLoading(false);

        }

    };

    return (

        <section className="min-h-screen bg-slate-50">

            <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-10">

                <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm lg:grid-cols-2">

                    <div className="hidden flex-col justify-center bg-indigo-600 p-12 text-white lg:flex">

                        <span className="w-fit rounded-full bg-white/20 px-4 py-2 text-sm">
                            Join MentorBridge
                        </span>

                        <h1 className="mt-8 text-5xl font-bold leading-tight">
                            Build Your Future With Expert Mentors
                        </h1>

                        <p className="mt-6 leading-8 text-indigo-100">
                            Create your account to connect with experienced mentors,
                            book sessions and accelerate your learning journey.
                        </p>

                    </div>

                    <div className="p-10 lg:p-14">

                        <h2 className="text-3xl font-bold text-gray-900">
                            Create Account
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Fill in your details to get started.
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-8 space-y-5"
                        >

                            <div>

                                <label className="mb-2 block font-medium">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    placeholder="Enter your full name"
                                    {...register("fullName")}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    {...register("email")}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    placeholder="Create password"
                                    {...register("password")}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600"
                                />

                            </div>

                            <div>

                                <label className="mb-2 block font-medium">
                                    Register As
                                </label>

                                <select
                                    {...register("role")}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600"
                                >
                                    <option value="student">Student</option>
                                    <option value="mentor">Mentor</option>
                                </select>

                            </div>

                            {role === "mentor" && (

                                <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-4">

                                    <p className="text-sm text-indigo-700">
                                        Mentor profiles will be reviewed by the admin before becoming visible to students.
                                    </p>

                                </div>

                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? "Creating Account..." : "Create Account"}
                            </button>

                        </form>

                        <p className="mt-8 text-center text-gray-500">

                            Already have an account?

                            <Link
                                to="/login"
                                className="ml-2 font-medium text-indigo-600"
                            >
                                Login
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Register;