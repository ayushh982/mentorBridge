import { useEffect, useState } from "react";
import { CalendarDays, Clock, Video, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Star } from "lucide-react";
import { createReview } from "../../services/review.service";
import { createConversation } from "../../services/chat.service";
import { useNavigate } from "react-router-dom";
import {
    getMyBookings,
    cancelBooking,
} from "../../services/booking.service";

const MyBookings = () => {
    
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

const [rating, setRating] = useState(5);
const [comment, setComment] = useState("");

    const fetchBookings = async () => {
        try {
            const res = await getMyBookings();

            // Backend returns { success, data }
            setBookings(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch bookings");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleCancelBooking = async (bookingId) => {
        try {
            await cancelBooking(bookingId);

            toast.success("Booking cancelled successfully");

            fetchBookings();
        } catch (error) {
            console.error(error);

            toast.error(
                error.response?.data?.message ||
                    "Failed to cancel booking"
            );
        }
    };

    const handleReviewSubmit = async () => {
    try {
        await createReview({
            bookingId: selectedBooking._id,
            rating,
            comment,
        });

        toast.success("Review submitted successfully");

        setShowReviewModal(false);
        setComment("");
        setRating(5);

        fetchBookings();
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            "Failed to submit review"
        );
    }
};

const handleChat = async (mentorId) => {

    try {
        const res = await createConversation(mentorId);

        navigate("/student/chat", {
            state: {
                conversation: res.data,
            },
        });
    } catch (error) {
        toast.error(
            error.response?.data?.message ||
            "Unable to start chat"
        );
    }
};

    if (loading) {
        return (
            <div className="p-10 text-center text-lg">
                Loading bookings...
            </div>
        );
    }

    return (
        <section>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    My Bookings
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your mentorship sessions.
                </p>
            </div>

            {bookings.length === 0 ? (
                <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        No Bookings Yet
                    </h2>

                    <p className="mt-3 text-gray-500">
                        Book your first mentorship session.
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="rounded-3xl border border-gray-200 bg-white p-6"
                        >
                            <div className="flex flex-col justify-between gap-6 lg:flex-row">
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {booking.mentor?.user?.fullName}
                                    </h2>

                                    <p className="mt-1 text-gray-500">
                                        {booking.mentor?.company}
                                    </p>

                                    <div className="mt-5 flex flex-wrap gap-6">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays
                                                size={18}
                                                className="text-indigo-600"
                                            />

                                            {new Date(
                                                booking.sessionDate
                                            ).toLocaleDateString()}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Clock
                                                size={18}
                                                className="text-indigo-600"
                                            />

                                            {booking.sessionTime}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-4">
                                    <span
                                        className={`rounded-full px-4 py-2 text-sm font-medium ${
                                            booking.bookingStatus ===
                                            "confirmed"
                                                ? "bg-green-100 text-green-700"
                                                : booking.bookingStatus ===
                                                  "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : booking.bookingStatus ===
                                                  "cancelled"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {booking.bookingStatus}
                                    </span>

                                    {booking.bookingStatus !==
                                        "cancelled" && (
                                        <>
                                            {booking.paymentStatus === "paid" ? (

                                        <button
                                            onClick={() => navigate(`/video/${booking._id}`)}
                                            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-white hover:bg-indigo-700"
                                        >
                                            <Video size={18} />
                                            Join Session
                                        </button>

                                    ) : (

                                        <button
                                            disabled
                                            className="rounded-xl bg-gray-300 px-5 py-3 text-gray-600 cursor-not-allowed"
                                        >
                                            Complete Payment First
                                        </button>

                                    )}

                                {booking.paymentStatus === "paid" ? (

                                    <button
                                        onClick={() => handleChat(booking.mentor._id)}
                                        className="rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                                    >
                                        Chat
                                    </button>

                                ) : (

                                    <button
                                        disabled
                                        className="rounded-xl bg-gray-300 px-4 py-2 text-gray-600 cursor-not-allowed"
                                    >
                                        Chat Locked
                                    </button>

                                )}

                                            <button
                                                onClick={() =>
                                                    handleCancelBooking(
                                                        booking._id
                                                    )
                                                }
                                                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-white hover:bg-red-700"
                                            >
                                                <XCircle size={18} />
                                                Cancel Booking
                                            </button>
                                            {booking.bookingStatus === "completed" &&
    !booking.isReviewed && (
        <button
            onClick={() => {
                setSelectedBooking(booking);
                setShowReviewModal(true);
            }}
            className="flex items-center gap-2 rounded-xl bg-yellow-500 px-5 py-3 text-white hover:bg-yellow-600"
        >
            <Star size={18} />
            Give Review
        </button>
)}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {showReviewModal && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

        <div className="w-full max-w-md rounded-2xl bg-white p-6">

            <h2 className="text-2xl font-bold">
                Give Review
            </h2>

            <div className="mt-6">

                <label className="font-medium">
                    Rating
                </label>

                <select
                    value={rating}
                    onChange={(e) =>
                        setRating(Number(e.target.value))
                    }
                    className="mt-2 w-full rounded-lg border p-3"
                >
                    <option value={5}>⭐⭐⭐⭐⭐</option>
                    <option value={4}>⭐⭐⭐⭐</option>
                    <option value={3}>⭐⭐⭐</option>
                    <option value={2}>⭐⭐</option>
                    <option value={1}>⭐</option>
                </select>

            </div>

            <div className="mt-5">

                <label className="font-medium">
                    Comment
                </label>

                <textarea
                    rows={4}
                    value={comment}
                    onChange={(e) =>
                        setComment(e.target.value)
                    }
                    className="mt-2 w-full rounded-lg border p-3"
                    placeholder="Write your experience..."
                />

            </div>

            <div className="mt-6 flex justify-end gap-3">

                <button
                    onClick={() =>
                        setShowReviewModal(false)
                    }
                    className="rounded-lg border px-5 py-2"
                >
                    Cancel
                </button>

                <button
                    onClick={handleReviewSubmit}
                    className="rounded-lg bg-indigo-600 px-5 py-2 text-white"
                >
                    Submit
                </button>

            </div>

        </div>

    </div>
)}
        </section>
    );
};

export default MyBookings;