import {
    IndianRupee,
    TrendingUp,
    Wallet,
} from "lucide-react";

import { useEffect, useState } from "react";

import { getMentorBookings } from "../../services/booking.service";

const MentorEarnings = () => {

    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBookings = async () => {

            try {

                const res = await getMentorBookings();

                setBookings(res.data);

            } finally {

                setLoading(false);

            }

        };

        fetchBookings();

    }, []);

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                Loading...
            </div>
        );
    }

    const paidBookings = bookings.filter(
        booking =>
            booking.paymentStatus === "paid" &&
            booking.bookingStatus !== "cancelled"
    );

    const totalEarnings = paidBookings.reduce(
        (sum, booking) => sum + booking.amount,
        0
    );

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyEarnings = paidBookings
        .filter(booking => {

            const date = new Date(booking.createdAt);

            return (
                date.getMonth() === currentMonth &&
                date.getFullYear() === currentYear
            );

        })
        .reduce((sum, booking) => sum + booking.amount, 0);

    const availableBalance = totalEarnings;

    return (

        <section>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Earnings
                </h1>

                <p className="mt-2 text-gray-500">
                    Track your income and recent transactions.
                </p>

            </div>

            <div className="grid gap-6 md:grid-cols-3">

                <div className="rounded-3xl border border-gray-200 bg-white p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Total Earnings
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                ₹{totalEarnings}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-indigo-50 p-4">

                            <IndianRupee className="text-indigo-600"/>

                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                This Month
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                ₹{monthlyEarnings}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-green-50 p-4">

                            <TrendingUp className="text-green-600"/>

                        </div>

                    </div>

                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-6">

                    <div className="flex items-center justify-between">

                        <div>

                            <p className="text-gray-500">
                                Available Balance
                            </p>

                            <h2 className="mt-3 text-3xl font-bold">
                                ₹{availableBalance}
                            </h2>

                        </div>

                        <div className="rounded-2xl bg-yellow-50 p-4">

                            <Wallet className="text-yellow-600"/>

                        </div>

                    </div>

                </div>

            </div>

            <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6">

                <h2 className="text-xl font-semibold">
                    Recent Transactions
                </h2>

                <div className="mt-6 overflow-x-auto">

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-gray-200">

                                <th className="py-4 text-left">
                                    Student
                                </th>

                                <th className="py-4 text-left">
                                    Date
                                </th>

                                <th className="py-4 text-left">
                                    Payment
                                </th>

                                <th className="py-4 text-right">
                                    Amount
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {paidBookings.map((booking) => (

                                <tr
                                    key={booking._id}
                                    className="border-b border-gray-100"
                                >

                                    <td className="py-5">
                                        {booking.student.fullName}
                                    </td>

                                    <td>
                                        {new Date(
                                            booking.createdAt
                                        ).toLocaleDateString()}
                                    </td>

                                    <td>
                                        {booking.paymentStatus}
                                    </td>

                                    <td className="text-right font-semibold text-green-600">
                                        + ₹{booking.amount}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </section>

    );

};

export default MentorEarnings;