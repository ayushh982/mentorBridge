import { ZegoServerAssistant } from "zego-server-assistant";

export const generateZegoToken = (userId, roomId, userName) => {
    const appId = Number(process.env.ZEGO_APP_ID);
    const serverSecret = process.env.ZEGO_SERVER_SECRET;

    const effectiveTimeInSeconds = 3600;

    const payload = JSON.stringify({
        room_id: roomId,
        privilege: {
            1: 1,
            2: 1,
        },
        stream_id_list: null,
    });

    return ZegoServerAssistant.generateToken04(
        appId,
        userId,
        serverSecret,
        effectiveTimeInSeconds,
        payload
    );
};