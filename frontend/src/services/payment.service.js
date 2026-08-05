import api from "./api";

export const createOrder = async (bookingId) => {
    const { data } = await api.post(
        "/payments/create-order",
        {
            bookingId,
        }
    );

    return data;
};

export const verifyPayment = async (paymentData) => {
    const { data } = await api.post(
        "/payments/verify",
        paymentData
    );

    return data;
};

export const getMyPayments = async () => {
    const { data } = await api.get(
        "/payments/my-payments"
    );

    return data;
};