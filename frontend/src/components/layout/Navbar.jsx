import { Link, NavLink } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = () => {
    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">

            <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

                <Link
                    to="/"
                    className="text-2xl font-bold tracking-tight text-indigo-600"
                >
                    MentorBridge
                </Link>

                <nav className="hidden items-center gap-8 md:flex">

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `transition ${
                                isActive
                                    ? "font-medium text-indigo-600"
                                    : "text-gray-600 hover:text-indigo-600"
                            }`
                        }
                    >
                        Home
                    </NavLink>

                    <NavLink
                        to="/mentors"
                        className={({ isActive }) =>
                            `transition ${
                                isActive
                                    ? "font-medium text-indigo-600"
                                    : "text-gray-600 hover:text-indigo-600"
                            }`
                        }
                    >
                        Find Mentors
                    </NavLink>

                    <NavLink
                        to="/about"
                        className={({ isActive }) =>
                            `transition ${
                                isActive
                                    ? "font-medium text-indigo-600"
                                    : "text-gray-600 hover:text-indigo-600"
                            }`
                        }
                    >
                        About
                    </NavLink>

                    <NavLink
                        to="/contact"
                        className={({ isActive }) =>
                            `transition ${
                                isActive
                                    ? "font-medium text-indigo-600"
                                    : "text-gray-600 hover:text-indigo-600"
                            }`
                        }
                    >
                        Contact
                    </NavLink>

                </nav>

                <div className="hidden items-center gap-3 md:flex">

                    <Link
                        to="/login"
                        className="rounded-xl px-5 py-2 text-gray-700 transition hover:bg-gray-100"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        className="rounded-xl bg-indigo-600 px-5 py-2 text-white transition hover:bg-indigo-700"
                    >
                        Get Started
                    </Link>

                </div>

                <button className="md:hidden">
                    <Menu size={28} />
                </button>

            </div>

        </header>
    );
};

export default Navbar;