import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMentorById } from "../../services/mentor.service";
import { bookSession } from "../../services/booking.service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
    createOrder,
    verifyPayment,
} from "../../services/payment.service";

import { CalendarDays, Clock, IndianRupee } from "lucide-react";

const slots = [
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "4:00 PM",
    "6:00 PM",
];

const BookSession = () => {
    
        const { mentorId } = useParams();
        const navigate = useNavigate();

const [mentor, setMentor] = useState(null);
const [loading, setLoading] = useState(true);
const [selectedDate, setSelectedDate] = useState("");
const [selectedSlot, setSelectedSlot] = useState("");
const [bookingLoading, setBookingLoading] = useState(false);

useEffect(() => {
    const fetchMentor = async () => {
        try {
            const res = await getMentorById(mentorId);

            console.log("Mentor API Response:", res);

            // If your backend returns { success, data }
            setMentor(res.data);

            // If console shows mentor object directly,
            // replace the above line with:
            // setMentor(res);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    fetchMentor();
}, [mentorId]);
if (loading) {
    return (
        <div className="p-10 text-center text-lg">
            Loading mentor...
        </div>
    );
}

const openRazorpay = (order, bookingId) => {

    const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "MentorBridge",

        description: "Mentorship Session",

        order_id: order.id,

        handler: async (response) => {

            try {

                await verifyPayment({
                    ...response,
                });

                toast.success("Payment Successful");

                navigate("/student/my-bookings");

            } catch (error) {

                console.log(error);

                toast.error("Payment verification failed");

            }

        },

        theme: {
            color: "#4F46E5",
        },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
};

const handleBooking = async () => {

    if (!selectedDate || !selectedSlot) {
        toast.error("Please select date and time");
        return;
    }

    try {

        setBookingLoading(true);

        const bookingRes = await bookSession({
            mentorId: mentor._id,
            sessionDate: selectedDate,
            sessionTime: selectedSlot,
            sessionDuration: mentor.sessionDuration,
        });

        const booking = bookingRes.data;

        // Free Mentorship
        if (mentor.isFreeMentorship) {

            toast.success("Session booked successfully");

            navigate("/student/my-bookings");

            return;
        }

        // Paid Mentorship
        const orderRes = await createOrder(booking._id);

        openRazorpay(orderRes.data, booking._id);

    } catch (error) {

        console.error(error);

        toast.error(
            error.response?.data?.message ||
            "Booking failed"
        );

    } finally {

        setBookingLoading(false);

    }

};
    return (
        
        <section>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Book Session
                </h1>

                <p className="mt-2 text-gray-500">
                    Schedule your mentorship session.
                </p>

            </div>

            <div className="grid gap-8 lg:grid-cols-3">

                <div className="space-y-8 lg:col-span-2">

                    <div className="rounded-3xl border border-gray-200 bg-white p-6">

                        <h2 className="text-xl font-semibold">
                            Mentor
                        </h2>

                        <div className="mt-6 flex items-center gap-5">

                            <img
                                src={
                                    mentor?.user?.avatar ||
                                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                                        mentor?.user?.fullName || "User"
                                    )}&background=4F46E5&color=ffffff`
                                }
                                alt={mentor?.user?.fullName}
                                className="h-20 w-20 rounded-full"
                            />

                            <div>

                                <h3 className="text-xl font-semibold">
                                    {mentor?.user?.fullName}
                                </h3>

                                <p className="text-gray-500">
                                    {mentor?.designation} • {mentor?.company}
                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-6">

                        <h2 className="text-xl font-semibold">
                            Select Date
                        </h2>

                       <input
    type="date"
    min={new Date().toISOString().split("T")[0]}
    value={selectedDate}
    onChange={(e) => setSelectedDate(e.target.value)}
    className="mt-5 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none"
/>

                    </div>

                    <div className="rounded-3xl border border-gray-200 bg-white p-6">

                        <h2 className="text-xl font-semibold">
                            Available Slots
                        </h2>

                        <div className="mt-6 flex flex-wrap gap-4">

                            {slots.map((slot) => (

                                <button
    key={slot}
    onClick={() => setSelectedSlot(slot)}
    className={`rounded-xl border px-5 py-3 transition ${
        selectedSlot === slot
            ? "border-indigo-600 bg-indigo-600 text-white"
            : "border-gray-200 hover:border-indigo-600 hover:text-indigo-600"
    }`}
>
    {slot}
</button>

                            ))}

                        </div>

                    </div>

                </div>

                <div>

                    <div className="sticky top-8 rounded-3xl border border-gray-200 bg-white p-6">

                        <h2 className="text-xl font-semibold">
                            Booking Summary
                        </h2>

                        <div className="mt-8 space-y-5">

                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">
                                    Session
                                </span>

                                <span>
                                    {mentor?.sessionDuration} Minutes
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">
                                    Date
                                </span>

                                <span>
                                    {selectedDate || "--"}
                                </span>

                            </div>

                            <div className="flex items-center justify-between">

                                <span className="text-gray-500">
                                    Time
                                </span>

                                <span>
                                   {selectedSlot || "--"}
                                </span>

                            </div>

                            <hr />

                            <div className="flex items-center justify-between text-lg font-semibold">

                                <span>Total</span>

                                <span className="flex items-center">

                                    <IndianRupee size={18} />

                                    {mentor?.isFreeMentorship ? (
    <span className="text-green-600 font-semibold">
        Free
    </span>
) : (
    <span className="flex items-center">
        
        {mentor?.pricing}
    </span>
)}

                                </span>

                            </div>

                        </div>

                        <button
    onClick={handleBooking}
    disabled={bookingLoading}
    className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
>
    {bookingLoading ? "Booking..." : "Continue to Payment"}
</button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default BookSession;