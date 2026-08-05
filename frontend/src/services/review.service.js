
import api from "./api";

export const createReview = async (reviewData) => {
    const res = await api.post("/reviews", reviewData);
    return res.data;
};

export const getMentorReviews = async (mentorId) => {
    const res = await api.get(`/reviews/${mentorId}`);
    return res.data;
};

export const getMyReviews = async () => {
    const res = await api.get("/reviews/my-reviews");
    return res.data;
};

export const deleteReview = async (reviewId) => {
    const res = await api.delete(`/reviews/${reviewId}`);
    return res.data;
};