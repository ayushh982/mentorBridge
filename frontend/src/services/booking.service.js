import api from "./api";

export const bookSession = async (bookingData) => {
    const { data } = await api.post("/bookings", bookingData);
    return data;
};

export const getMyBookings = async () => {
    const { data } = await api.get("/bookings/my-bookings");
    return data;
};

export const cancelBooking = async (bookingId) => {
    const { data } = await api.patch(`/bookings/${bookingId}/cancel`);
    return data;
};

export const rescheduleBooking = async (
    bookingId,
    bookingData
) => {
    const { data } = await api.patch(
        `/bookings/${bookingId}/reschedule`,
        bookingData
    );

    return data;
};

export const getMentorBookings = async () => {
    const res = await api.get("/bookings/mentor-bookings");
    return res.data;
};

export const getMentorStats = async () => {
    const res = await api.get("/bookings/mentor-stats");
    return res.data;
};