import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import ProtectedRoute from "../components/layout/ProtectedRoute";


// Public Pages
import Landing from "../pages/public/Landing";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import MentorListing from "../pages/public/MentorListing";
import MentorDetails from "../pages/public/MentorDetails";

// Auth
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// Student Pages
import StudentDashboard from "../pages/student/Dashboard";
import BookSession from "../pages/student/BookSession";
import MyBookings from "../pages/student/MyBookings";
import PaymentHistory from "../pages/student/PaymentHistory";
import StudentChat from "../pages/student/Chat";
import StudentProfile from "../pages/student/Profile";
import Settings from "../pages/student/Settings";

// Mentor Pages
import MentorDashboard from "../pages/mentor/Dashboard";
import CompleteProfile from "../pages/mentor/CompleteProfile";
import Sessions from "../pages/mentor/Sessions";
import MentorEarnings from "../pages/mentor/Earnings";
import MentorReviews from "../pages/mentor/Reviews";
import MentorChat from "../pages/mentor/Chat";
import MentorProfile from "../pages/mentor/Profile";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import PendingMentors from "../pages/admin/PendingMentors";
import AdminUsers from "../pages/admin/Users";
import AdminBookings from "../pages/admin/Bookings";
import AdminPayments from "../pages/admin/Payments";

//video
import VideoCall from "../pages/video/VideoCall.jsx";

const AppRoutes = () => {
    return (
        <Routes>

            {/* Public Routes */}

            <Route element={<MainLayout />}>

                <Route path="/" element={<Landing />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/mentors" element={<MentorListing />} />
                <Route path="/mentors/:id" element={<MentorDetails />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

            </Route>

            {/* Student */}

            <Route element={<ProtectedRoute roles={["student"]} />}>

    <Route element={<DashboardLayout />}>

        <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
        />

        <Route
            path="/student/book-session/:mentorId"
            element={<BookSession />}
        />

        <Route
            path="/student/my-bookings"
            element={<MyBookings />}
        />

        <Route
            path="/student/payments"
            element={<PaymentHistory />}
        />

        <Route
            path="/student/chat"
            element={<StudentChat />}
        />

        <Route
            path="/student/profile"
            element={<StudentProfile />}
        />

        <Route
            path="/student/settings"
            element={<Settings />}
        />
        <Route
            path="/student/mentors"
            element={<MentorListing />}
        />


    </Route>

</Route>

            <Route element={<ProtectedRoute roles={["student", "mentor"]} />}>
                <Route
                    path="/video/:bookingId"
                    element={<VideoCall />}
                />
            </Route>

            {/* Mentor */}

        <Route element={<ProtectedRoute roles={["mentor"]} />}>

    <Route element={<DashboardLayout />}>

        <Route
            path="/mentor/dashboard"
            element={<MentorDashboard />}
        />

        <Route
            path="/mentor/complete-profile"
            element={<CompleteProfile />}
        />

        <Route
            path="/mentor/sessions"
            element={<Sessions />}
        />

        <Route
            path="/mentor/earnings"
            element={<MentorEarnings />}
        />

        <Route
            path="/mentor/reviews"
            element={<MentorReviews />}
        />

        <Route
            path="/mentor/chat"
            element={<MentorChat />}
        />

        <Route
            path="/mentor/profile"
            element={<MentorProfile />}
        />

    </Route>

</Route>

            {/* Admin */}

            <Route element={<ProtectedRoute roles={["admin"]} />}>

    <Route element={<DashboardLayout />}>

        <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
        />

        <Route
            path="/admin/pending-mentors"
            element={<PendingMentors />}
        />

        <Route
            path="/admin/users"
            element={<AdminUsers />}
        />

        <Route
            path="/admin/bookings"
            element={<AdminBookings />}
        />

        <Route
            path="/admin/payments"
            element={<AdminPayments />}
        />

    </Route>

</Route>

        
        </Routes>
    );
};

export default AppRoutes;