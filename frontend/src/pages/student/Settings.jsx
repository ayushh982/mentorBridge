import { useState } from "react";

const Settings = () => {

    const [notifications, setNotifications] = useState(true);

    return (

        <section>

            <div className="mb-8">

                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="mt-2 text-gray-500">
                    Manage your account preferences.
                </p>

            </div>

            <div className="space-y-8">

                <div className="rounded-3xl border border-gray-200 bg-white p-8">

                    <h2 className="text-xl font-semibold">
                        Change Password
                    </h2>

                    <div className="mt-6 space-y-5">

                        <input
                            type="password"
                            placeholder="Current Password"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                        />

                        <input
                            type="password"
                            placeholder="New Password"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                        />

                        <button className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700">
                            Update Password
                        </button>

                    </div>

                </div>

                <div className="rounded-3xl border border-gray-200 bg-white p-8">

                    <div className="flex items-center justify-between">

                        <div>

                            <h2 className="text-xl font-semibold">
                                Email Notifications
                            </h2>

                            <p className="mt-2 text-gray-500">
                                Receive reminders and booking updates.
                            </p>

                        </div>

                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`relative h-7 w-14 rounded-full transition ${
                                notifications
                                    ? "bg-indigo-600"
                                    : "bg-gray-300"
                            }`}
                        >

                            <span
                                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                                    notifications
                                        ? "left-8"
                                        : "left-1"
                                }`}
                            />

                        </button>

                    </div>

                </div>

            </div>

        </section>

    );

};

export default Settings;