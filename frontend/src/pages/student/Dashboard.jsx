import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    CalendarDays,
    MessageCircle,
    Users,
    Star,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { getStudentDashboardData } from "../../services/dashboard.service";


const Dashboard = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    const [bookings, setBookings] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboard = async () => {

            try {

                const res = await getStudentDashboardData();

                setBookings(res.bookings);
                setMentors(res.mentors);

            } catch (err) {

                console.error(err);

            } finally {

                setLoading(false);

            }

        };

        fetchDashboard();

    }, []);

    const upcomingBookings = useMemo(() => {

    return bookings.filter(
        (booking) =>
            booking.bookingStatus === "pending" ||
            booking.bookingStatus === "confirmed"
    );

}, [bookings]);

const stats = [

    {
        title: "Upcoming Sessions",
        value: upcomingBookings.length,
        icon: CalendarDays,
    },

    {
        title: "My Mentors",
        value: mentors.length,
        icon: Users,
    },

    {
        title: "Messages",
        value: "--",
        icon: MessageCircle,
    },

    {
        title: "Average Rating",
        value: "--",
        icon: Star,
    },

];

const recommendedMentor = mentors[0] || null;
    return (
        <section>

            <div className="mb-10">

                <h1 className="text-3xl font-bold text-gray-900">
                    Welcome Back, {user?.fullName} 👋
                </h1>

                <p className="mt-2 text-gray-500">
                    Here's what's happening today.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

                {stats.map((item) => {

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
                                        className="text-indigo-600"
                                        size={24}
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

    {upcomingBookings.length > 0 ? (

        upcomingBookings.map((session) => (

            <div
                key={session._id}
                className="flex items-center justify-between rounded-2xl border border-gray-100 p-5"
            >

                <div>

                    <h3 className="font-semibold">
                        {session.mentor?.user?.fullName}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                        {session.mentor?.company}
                    </p>

                </div>

                <div className="text-right">

                    <p className="font-medium">
                        {new Date(session.sessionDate).toLocaleDateString()}
                    </p>

                    <p className="text-sm text-gray-500">
                        {session.sessionTime}
                    </p>

                </div>

            </div>

        ))

    ) : (

        <p className="text-center text-gray-500">
            No upcoming sessions.
        </p>

    )}

</div>

                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">

                    <h2 className="text-xl font-semibold">
                        Recommended Mentor
                    </h2>

                    <img
                        src={
                            recommendedMentor?.user?.avatar ||
                             "https://i.pravatar.cc/150?img=5"
                            }
                        alt="mentor"
                        className="mx-auto mt-8 h-24 w-24 rounded-full"
                    />

                    <h3 className="mt-5 text-center text-xl font-semibold">
                        {recommendedMentor?.user?.fullName}
                    </h3>

                    <p className="mt-2 text-center text-gray-500">
                        {recommendedMentor?.designation}
                    </p>

                    <button
    onClick={() =>
        recommendedMentor &&
        navigate(`/mentors/${recommendedMentor._id}`)
    }
    className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700"
>
    View Profile
</button>

                </div>

            </div>

        </section>
    );
};

export default Dashboard;