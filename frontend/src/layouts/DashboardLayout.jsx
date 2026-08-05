import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";

const DashboardLayout = () => {
    return (
        <div className="flex">

            <Sidebar />

            <main className="flex-1 bg-gray-50 p-8">
                <Outlet />
            </main>

        </div>
    );
};

export default DashboardLayout;