import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import { getAllUsers } from "../../services/admin.service";

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getAllUsers();
            setUsers(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return (
                user.fullName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                user.email
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        });
    }, [users, search]);

    if (loading) {
        return (
            <div className="flex h-[70vh] items-center justify-center text-lg">
                Loading users...
            </div>
        );
    }

    return (
        <section>

            <div className="mb-8 flex items-center justify-between">

                <div>

                    <h1 className="text-3xl font-bold">
                        Users
                    </h1>

                    <p className="mt-2 text-gray-500">
                        View all registered users.
                    </p>

                </div>

                <div className="relative w-80">

                    <Search
                        size={18}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search users..."
                        className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-indigo-600"
                    />

                </div>

            </div>

            <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white">

                <table className="w-full">

                    <thead className="bg-slate-50">

                        <tr>

                            <th className="px-6 py-4 text-left">
                                Name
                            </th>

                            <th className="px-6 py-4 text-left">
                                Email
                            </th>

                            <th className="px-6 py-4 text-left">
                                Role
                            </th>

                            <th className="px-6 py-4 text-left">
                                Verified
                            </th>

                            <th className="px-6 py-4 text-left">
                                Active
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="5"
                                    className="py-10 text-center text-gray-500"
                                >
                                    No users found.
                                </td>

                            </tr>

                        ) : (

                            filteredUsers.map((user) => (

                                <tr
                                    key={user._id}
                                    className="border-t border-gray-100"
                                >

                                    <td className="px-6 py-5 font-medium">
                                        {user.fullName}
                                    </td>

                                    <td className="px-6 py-5">
                                        {user.email}
                                    </td>

                                    <td className="px-6 py-5">

                                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-600 capitalize">
                                            {user.role}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${
                                                user.isVerified
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-yellow-50 text-yellow-700"
                                            }`}
                                        >
                                            {user.isVerified
                                                ? "Verified"
                                                : "Pending"}
                                        </span>

                                    </td>

                                    <td className="px-6 py-5">

                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${
                                                user.isActive
                                                    ? "bg-green-50 text-green-600"
                                                    : "bg-red-50 text-red-600"
                                            }`}
                                        >
                                            {user.isActive
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </td>

                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </section>
    );
};

export default AdminUsers;