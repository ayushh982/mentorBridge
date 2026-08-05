import { useEffect, useState } from "react";
import {
    CheckCircle,
    Clock3,
    IndianRupee,
    XCircle,
} from "lucide-react";

import { getMyPayments } from "../../services/payment.service";

const PaymentHistory = () => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchPayments = async () => {

            try {

                const res = await getMyPayments();

                setPayments(res.data);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchPayments();

    }, []);

    const getStatus = (status) => {

        if (status === "paid") {
            return {
                icon: CheckCircle,
                className: "text-green-600 bg-green-50",
                text: "Success",
            };
        }

        if (status === "created") {
            return {
                icon: Clock3,
                className: "text-yellow-600 bg-yellow-50",
                text: "Pending",
            };
        }

        return {
            icon: XCircle,
            className: "text-red-600 bg-red-50",
            text: "Failed",
        };
    };

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
                    Payment History
                </h1>

                <p className="mt-2 text-gray-500">
                    View all your completed and pending payments.
                </p>

            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">

                <table className="w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Payment ID
                            </th>

                            <th className="px-6 py-4 text-left">
                                Mentor
                            </th>

                            <th className="px-6 py-4 text-left">
                                Amount
                            </th>

                            <th className="px-6 py-4 text-left">
                                Date
                            </th>

                            <th className="px-6 py-4 text-left">
                                Status
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {payments.length === 0 ? (

                            <tr>

                                <td
                                    colSpan={5}
                                    className="py-10 text-center text-gray-500"
                                >
                                    No payments found.
                                </td>

                            </tr>

                        ) : (

                            payments.map((payment) => {

                                const status = getStatus(payment.status);

                                const Icon = status.icon;

                                return (

                                    <tr
                                        key={payment._id}
                                        className="border-t border-gray-100"
                                    >

                                        <td className="px-6 py-5 font-medium">
                                            {payment.razorpayPaymentId || payment.razorpayOrderId}
                                        </td>

                                        <td className="px-6 py-5">
                                            {payment.mentor?.user?.fullName}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span className="flex items-center">

                                                <IndianRupee size={16} />

                                                {payment.booking?.amount}

                                            </span>

                                        </td>

                                        <td className="px-6 py-5">
                                            {new Date(payment.createdAt).toLocaleDateString()}
                                        </td>

                                        <td className="px-6 py-5">

                                            <span
                                                className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ${status.className}`}
                                            >

                                                <Icon size={16} />

                                                {status.text}

                                            </span>

                                        </td>

                                    </tr>

                                );

                            })

                        )}

                    </tbody>

                </table>

            </div>

        </section>

    );

};

export default PaymentHistory;