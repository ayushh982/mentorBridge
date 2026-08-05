import { CalendarDays } from "lucide-react";

const AdminBookings = () => {
    return (
        <section className="flex h-[70vh] items-center justify-center">

            <div className="rounded-3xl border border-gray-200 bg-white p-12 text-center">

                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
                    <CalendarDays
                        size={36}
                        className="text-indigo-600"
                    />
                </div>

                <h1 className="text-3xl font-bold">
                    Bookings
                </h1>

                <p className="mt-4 text-gray-500">
                    Admin booking management will be available in a future update.
                </p>

            </div>

        </section>
    );
};

export default AdminBookings;