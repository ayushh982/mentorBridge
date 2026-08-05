import api from "./api";

export const createConversation = async (receiverId) => {
    const res = await api.post("/chat/conversation", {
        receiverId,
    });

    return res.data;
};

export const getConversations = async () => {
    const res = await api.get("/chat/conversations");

    return res.data;
};

export const getMessages = async (conversationId) => {
    const res = await api.get(`/chat/messages/${conversationId}`);

    return res.data;
};