import {
    LayoutDashboard,
    User,
    CalendarDays,
    MessageCircle,
    CreditCard,
    Settings,
    LogOut,
    Star,
    ShieldCheck
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const studentLinks = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/student/dashboard",
        },
        {
            name: "Browse Mentors",
            icon: CalendarDays,
            path: "/student/mentors",
        },
        {
            name: "My Bookings",
            icon: CalendarDays,
            path: "/student/my-bookings",
        },
        {
            name: "Messages",
            icon: MessageCircle,
            path: "/student/chat",
        },
        {
            name: "Payments",
            icon: CreditCard,
            path: "/student/payments",
        },
        {
            name: "Profile",
            icon: User,
            path: "/student/profile",
        },
        {
            name: "Settings",
            icon: Settings,
            path: "/student/settings",
        },
    ];

    const mentorLinks = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            path: "/mentor/dashboard",
        },
        {
            name: "Complete Profile",
            icon: User,
            path: "/mentor/complete-profile",
        },
        {
            name: "Sessions",
            icon: CalendarDays,
            path: "/mentor/sessions",
        },
        {
            name: "Earnings",
            icon: CreditCard,
            path: "/mentor/earnings",
        },
        {
            name: "Reviews",
            icon: Star,
            path: "/mentor/reviews",
        },
        {
            name: "Chat",
            icon: MessageCircle,
            path: "/mentor/chat",
        },
        {
            name: "Profile",
            icon: User,
            path: "/mentor/profile",
        },
    ];

    const adminLinks = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/admin/dashboard",
    },
    {
        name: "Pending Mentors",
        icon: ShieldCheck,
        path: "/admin/pending-mentors",
    },
    {
        name: "Users",
        icon: User,
        path: "/admin/users",
    },
    {
        name: "Bookings",
        icon: CalendarDays,
        path: "/admin/bookings",
    },
    {
        name: "Payments",
        icon: CreditCard,
        path: "/admin/payments",
    },
];

    const links =
    user?.role === "student"
        ? studentLinks
        : user?.role === "mentor"
        ? mentorLinks
        : adminLinks;

    const handleLogout = async () => {

        await logout();

        navigate("/login");

    };

    return (

        <aside className="sticky top-0 flex h-screen w-72 flex-col border-r border-gray-200 bg-white">

            <div className="border-b border-gray-200 p-6">

                <h2 className="text-2xl font-bold text-indigo-600">
                    MentorBridge
                </h2>

            </div>

            <nav className="flex-1 space-y-2 p-5">

                {links.map((link) => {

                    const Icon = link.icon;

                    return (

                        <NavLink
                            key={link.name}
                            to={link.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                                    isActive
                                        ? "bg-indigo-600 text-white"
                                        : "text-gray-600 hover:bg-gray-100"
                                }`
                            }
                        >

                            <Icon size={20} />

                            <span>{link.name}</span>

                        </NavLink>

                    );

                })}

            </nav>

            <div className="border-t border-gray-200 p-5">

                <div className="mb-5">

                    <p className="font-semibold">
                        {user?.fullName}
                    </p>

                    <p className="text-sm text-gray-500">
                        {user?.email}
                    </p>

                </div>

                <button
                    onClick={handleLogout}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-600 transition hover:bg-red-50"
                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;