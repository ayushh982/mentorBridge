import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import { getMeetingDetails } from "../../services/video.service";
import { useAuth } from "../../context/AuthContext";

const VideoCall = () => {
    console.log("VideoCall Mounted");

    const { bookingId } = useParams();
    const { user } = useAuth();

    const meetingRef = useRef(null);

    useEffect(() => {
        console.log("VideoCall useEffect");

        const startMeeting = async () => {
            console.log("Calling API");

            try {

                const res = await getMeetingDetails(bookingId);

                const meetingId = res.data.meetingId;

                const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);

                const serverSecret = "65652d60ad41bbe965999fa7c61997f8";

                const kitToken =
                    ZegoUIKitPrebuilt.generateKitTokenForTest(
                        appID,
                        serverSecret,
                        meetingId,
                        user._id,
                        user.fullName
                    );

                const zp =
                    ZegoUIKitPrebuilt.create(kitToken);

                zp.joinRoom({

                    container: meetingRef.current,

                    sharedLinks: [
                        {
                            name: "Copy Link",
                            url: `${window.location.origin}/video/${bookingId}`,
                        },
                    ],

                    scenario: {
                        mode:
                            ZegoUIKitPrebuilt.OneONoneCall,
                    },

                    showScreenSharingButton: true,

                });

            } catch (error) {

                console.log(error);

            }

        };

        if (user) {
            startMeeting();
        }

    }, [bookingId, user]);

    return (
        <div
            ref={meetingRef}
            className="h-screen w-full"
        />
    );
};

export default VideoCall;