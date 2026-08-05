import api from "./api";

export const chatWithAI = async (prompt) => {
    const { data } = await api.post(
        "/ai/chat",
        {
            prompt,
        }
    );

    return data;
};