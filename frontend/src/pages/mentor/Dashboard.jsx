import {
    CalendarDays,
    IndianRupee,
    Users,
    Star,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    getMentorBookings,
    getMentorStats,
} from "../../services/booking.service";

const Dashboard = () => {

    const navigate = useNavigate();

    const [stats, setStats] = useState(null);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const [statsRes, bookingsRes] = await Promise.all([
                    getMentorStats(),
                    getMentorBookings(),
                ]);

                setStats(statsRes.data);
                setBookings(bookingsRes.data);

            } catch (error) {

                console.error(error);

                if (
                    error.response?.data?.message ===
                    "Mentor profile not found"
                ) {

                    navigate("/mentor/complete-profile");
                    return;

                }

            } finally {
                setLoading(false);
            }

        };

        fetchDashboard();

    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }
            if (!stats) {
            return null;
        }

    const dashboardCards = [
        {
            title: "Today's Sessions",
            value: stats.todaySessions,
            icon: CalendarDays,
        },
        {
            title: "Total Students",
            value: stats.totalStudents,
            icon: Users,
        },
        {
            title: "Total Earnings",
            value: `₹${stats.totalEarnings}`,
            icon: IndianRupee,
        },
        {
            title: "Pending Sessions",
            value: stats.pendingBookings,
            icon: Star,
        },
    ];

    return (
        <section>

            <div className="mb-10">

                <h1 className="text-3xl font-bold">
                    Mentor Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Welcome back. Here's your mentorship overview.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {dashboardCards.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="rounded-3xl border border-gray-200 bg-white p-6"
                        >

                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-gray-500">
                                        {item.title}
                                    </p>

                                    <h2 className="mt-3 text-3xl font-bold">
                                        {item.value}
                                    </h2>

                                </div>

                                <div className="rounded-2xl bg-indigo-50 p-4">

                                    <Icon
                                        size={24}
                                        className="text-indigo-600"
                                    />

                                </div>

                            </div>

                        </div>

                    );

                })}

            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-3">

                <div className="rounded-3xl border border-gray-200 bg-white p-6 lg:col-span-2">

                    <h2 className="text-xl font-semibold">
                        Upcoming Sessions
                    </h2>

                    <div className="mt-6 space-y-5">

                        {bookings
                            .filter(
                                (booking) =>
                                    booking.bookingStatus !== "cancelled"
                            )
                            .map((booking) => (

                                <div
                                    key={booking._id}
                                    className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
                                >

                                    <div>

                                        <h3 className="font-semibold">
                                            {booking.student.fullName}
                                        </h3>

                                        <p className="mt-1 text-gray-500">
                                            {new Date(
                                                booking.sessionDate
                                            ).toLocaleDateString()}
                                        </p>

                                    </div>

                                    <span className="rounded-xl bg-indigo-50 px-4 py-2 text-indigo-600">
                                        {booking.sessionTime}
                                    </span>

                                </div>

                            ))}

                        {bookings.filter(
                            (booking) =>
                                booking.bookingStatus !== "cancelled"
                        ).length === 0 && (

                            <div className="py-10 text-center text-gray-500">
                                No upcoming sessions.
                            </div>

                        )}

                    </div>

                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">

                    <h2 className="text-xl font-semibold">
                        Total Earnings
                    </h2>

                    <h1 className="mt-8 text-5xl font-bold text-indigo-600">
                        ₹{stats.totalEarnings}
                    </h1>

                    <p className="mt-4 text-gray-500">
                        Earnings from completed paid mentorship sessions.
                    </p>

                    <button className="mt-10 w-full rounded-xl bg-indigo-600 py-3 text-white hover:bg-indigo-700">
                        View Earnings
                    </button>

                </div>

            </div>

        </section>
    );
};

export default Dashboard;