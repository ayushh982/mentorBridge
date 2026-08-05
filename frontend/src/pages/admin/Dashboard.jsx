import {
    Users,
    ShieldCheck,
    CalendarDays,
    CreditCard,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

const quickActions = [
    {
        title: "Pending Mentors",
        description: "Review mentor verification requests.",
        icon: ShieldCheck,
        path: "/admin/pending-mentors",
    },
    {
        title: "Users",
        description: "View all registered users.",
        icon: Users,
        path: "/admin/users",
    },
    {
        title: "Bookings",
        description: "View booking management.",
        icon: CalendarDays,
        path: "/admin/bookings",
    },
    {
        title: "Payments",
        description: "View payment management.",
        icon: CreditCard,
        path: "/admin/payments",
    },
];

const AdminDashboard = () => {

    const navigate = useNavigate();

    return (

        <section>

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Welcome Admin 👋
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage mentors, users and platform resources.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2">

                {quickActions.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            onClick={() => navigate(item.path)}
                            className="cursor-pointer rounded-3xl border border-gray-200 bg-white p-8 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                        >

                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50">

                                <Icon
                                    size={28}
                                    className="text-indigo-600"
                                />

                            </div>

                            <h2 className="text-xl font-semibold">
                                {item.title}
                            </h2>

                            <p className="mt-3 text-gray-500">
                                {item.description}
                            </p>

                        </div>

                    );

                })}

            </div>

        </section>

    );

};

export default AdminDashboard;