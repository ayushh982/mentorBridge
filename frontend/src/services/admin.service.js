import api from "./api";

export const getPendingMentors = async () => {
    const response = await api.get("/admin/pending-mentors");
    return response.data.data;
};

export const approveMentor = async (mentorId) => {
    const response = await api.patch(`/admin/approve/${mentorId}`);
    return response.data;
};

export const rejectMentor = async (mentorId) => {
    const response = await api.patch(`/admin/reject/${mentorId}`);
    return response.data;
};

export const getAllUsers = async () => {
    const response = await api.get("/admin/users");
    return response.data.data;
};