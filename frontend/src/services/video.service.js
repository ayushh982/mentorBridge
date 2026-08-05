import api from "./api";

export const getMeetingDetails = async (
    bookingId
) => {
    const { data } = await api.get(
        `/video/${bookingId}`
    );

    return data;
};