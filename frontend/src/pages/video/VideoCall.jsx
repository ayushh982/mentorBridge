import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

import { getMeetingDetails } from "../../services/video.service";
import { useAuth } from "../../context/AuthContext";

const VideoCall = () => {
    
    const hasJoined = useRef(false);
    const { bookingId } = useParams();
    const { user } = useAuth();

    const meetingRef = useRef(null);

    useEffect(() => {
        

        const startMeeting = async () => {
            

            try {

                const res = await getMeetingDetails(bookingId);

                const meetingId = res.data.meetingId;

                

                const appID = Number(import.meta.env.VITE_ZEGO_APP_ID);

                const serverSecret = "92f7204c89780f810b39fd424f5ef2fd";

                // const kitToken =
                //     ZegoUIKitPrebuilt.generateKitTokenForTest(
                //         appID,
                //         serverSecret,
                //         meetingId,
                //         user._id,
                //         user.fullName
                //     );

                const zegoUserId = String(Date.now());

                const kitToken =
                    ZegoUIKitPrebuilt.generateKitTokenForTest(
                        appID,
                        serverSecret,
                        meetingId,
                        zegoUserId,
                        user.fullName
                    );

                    console.log("Token Generated:", !!kitToken);
                    console.log(kitToken);
                    console.log("App ID:", appID);
                    console.log("Server Secret:", serverSecret);
                    console.log("Meeting ID:", meetingId);
                    console.log("User ID:", user._id);

                const zp =
                    ZegoUIKitPrebuilt.create(kitToken);

                try{zp.joinRoom({

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

                })}catch(error){
                    console.log("error of join room",error);
                }

            } catch (error) {

                console.log(error);

            }

        };

        // if (user) {
        //     startMeeting();
        // }

        if (user && !hasJoined.current) {
            hasJoined.current = true;
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