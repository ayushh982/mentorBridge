import { getMyBookings } from "./booking.service";
import { getAllMentors } from "./mentor.service";

export const getStudentDashboardData = async () => {
    const [bookingRes, mentorRes] = await Promise.all([
        getMyBookings(),
        getAllMentors(),
    ]);

    return {
        bookings: bookingRes.data,
        mentors: mentorRes.data,
    };
};
