import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const {
        register,
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const { setUser } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (formData) => {

    setIsLoading(true);

    try {

        const res = await loginUser(formData);

        console.log("LOGIN RESPONSE:Logged-In successful,frontend/src/pages/auth/login.jsx me check");

        // Save logged-in user in AuthContext
        setUser(res.data.user);

        toast.success(res.message);

        const role = res.data.user.role;

        if (role === "student") {

            navigate("/student/dashboard", { replace: true });

        } else if (role === "mentor") {

            navigate("/mentor/dashboard", { replace: true });

        } else if (role === "admin") {

            navigate("/admin/dashboard", { replace: true });

        } else {

            toast.error("Invalid user role");

        }

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message || "Login failed"
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
                            Welcome Back
                        </span>

                        <h1 className="mt-8 text-5xl font-bold leading-tight">
                            Continue Your Learning Journey
                        </h1>

                        <p className="mt-6 leading-8 text-indigo-100">
                            Connect with experienced mentors, join live sessions,
                            improve your skills and accelerate your career.
                        </p>

                    </div>

                    <div className="p-10 lg:p-14">

                        <h2 className="text-3xl font-bold text-gray-900">
                            Login
                        </h2>

                        <p className="mt-2 text-gray-500">
                            Welcome back! Please login to continue.
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="mt-10 space-y-6"
                        >

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
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none transition focus:border-indigo-600"
                                />

                            </div>

                            <div className="flex items-center justify-between">

                                <label className="flex items-center gap-2 text-sm">

                                    <input type="checkbox" />

                                    Remember me

                                </label>

                                <button
                                    type="button"
                                    className="text-sm text-indigo-600"
                                >
                                    Forgot Password?
                                </button>

                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full rounded-xl bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                {isLoading ? "Logging in..." : "Login"}
                            </button>

                        </form>

                        <p className="mt-8 text-center text-gray-500">

                            Don't have an account?

                            <Link
                                to="/register"
                                className="ml-2 font-medium text-indigo-600"
                            >
                                Register
                            </Link>

                        </p>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Login;