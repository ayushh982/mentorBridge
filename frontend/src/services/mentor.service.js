import api from "./api";

export const createMentorProfile = async (profileData) => {
    const { data } = await api.post("/mentors", profileData);
    return data;
};

export const updateMentorProfile = async (profileData) => {
    const { data } = await api.patch("/mentors", profileData);
    return data;
};

export const getAllMentors = async () => {
    const { data } = await api.get("/mentors");
    return data;
};

export const getMentorById = async (mentorId) => {
    const { data } = await api.get(`/mentors/${mentorId}`);
    return data;
};

export const getMyMentorProfile = async () => {
    const res = await api.get("/mentors/me");
    return res.data;
};