import { CalendarDays, Clock, Video } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { getMentorBookings } from "../../services/booking.service";

const Sessions = () => {

    const navigate = useNavigate();

    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchSessions = async () => {

            try {

                const res = await getMentorBookings();

                setSessions(res.data);

            } catch (error) {

                console.error(error);

                toast.error("Failed to load sessions.");

            } finally {

                setLoading(false);

            }

        };

        fetchSessions();

    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    return (

        <section>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    My Sessions
                </h1>

                <p className="mt-2 text-gray-500">
                    View and manage your mentorship sessions.
                </p>

            </div>

            <div className="space-y-6">

                {sessions.length === 0 ? (

                    <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center text-gray-500">
                        No sessions found.
                    </div>

                ) : (

                    sessions.map((session) => {

    const now = new Date();

    const sessionDateTime = new Date(
        `${new Date(session.sessionDate).toISOString().split("T")[0]}T${session.sessionTime}`
    );

    const isExpired = sessionDateTime < now;

    let statusText = session.bookingStatus;
    let statusClass = "bg-green-50 text-green-600";

    if (session.bookingStatus === "cancelled") {
        statusText = "Cancelled";
        statusClass = "bg-red-50 text-red-600";
    } else if (session.bookingStatus === "completed") {
        statusText = "Completed";
        statusClass = "bg-gray-100 text-gray-600";
    } else if (isExpired) {
        statusText = "Expired";
        statusClass = "bg-yellow-100 text-yellow-700";
    } else if (session.bookingStatus === "pending") {
        statusText = "Pending";
        statusClass = "bg-yellow-50 text-yellow-600";
    } else if (session.bookingStatus === "confirmed") {
        statusText = "Confirmed";
        statusClass = "bg-green-50 text-green-600";
    }

    return (

        <div
            key={session._id}
            className="rounded-3xl border border-gray-200 bg-white p-6"
        >

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                <div>

                    <h2 className="text-xl font-semibold">
                        {session.student.fullName}
                    </h2>

                    <p className="mt-2 text-gray-500">
                        {session.student.email}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-6">

                        <div className="flex items-center gap-2">
                            <CalendarDays
                                size={18}
                                className="text-indigo-600"
                            />
                            {new Date(session.sessionDate).toLocaleDateString()}
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock
                                size={18}
                                className="text-indigo-600"
                            />
                            {session.sessionTime}
                        </div>

                    </div>

                </div>

                <div className="flex flex-col items-end gap-4">

                    <span
                        className={`rounded-full px-4 py-2 text-sm font-medium ${statusClass}`}
                    >
                        {statusText}
                    </span>

                    {session.bookingStatus === "confirmed" && !isExpired ? (

                        <button
                            onClick={() => navigate(`/video/${session._id}`)}
                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                        >
                            <Video size={18} />
                            Join Session
                        </button>

                    ) : (

                        <button
                            disabled
                            className="rounded-xl bg-gray-200 px-5 py-3 text-gray-500 cursor-not-allowed"
                        >
                            {statusText}
                        </button>

                    )}

                </div>

            </div>

        </div>

    );

})

                )}

            </div>

        </section>

    );
};

export default Sessions;