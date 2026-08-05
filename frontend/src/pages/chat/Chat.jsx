import { useState } from "react";

const Chat = () => {
    const [selectedConversation, setSelectedConversation] = useState(null);

    return (
        <div className="flex h-[calc(100vh-80px)] rounded-2xl border bg-white overflow-hidden">

            {/* Left Sidebar */}

            <div className="w-80 border-r">

                <div className="p-4 border-b">

                    <h2 className="text-xl font-bold">
                        Chats
                    </h2>

                </div>

                <div className="p-4 text-gray-500">
                    No conversations yet.
                </div>

            </div>

            {/* Right Chat Area */}

            <div className="flex-1 flex items-center justify-center">

                <p className="text-gray-500">
                    Select a conversation
                </p>

            </div>

        </div>
    );
};

export default Chat;