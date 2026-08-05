import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../services/socket";

import {
    getConversations,
    getMessages,
} from "../../services/chat.service";

import { useAuth } from "../../context/AuthContext";

const MentorChat = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();
    const location = useLocation();

    const openConversation = async (conversation) => {
        setSelectedConversation(conversation);

        try {
            const res = await getMessages(conversation._id);
            setMessages(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchConversations = async () => {
        try {
            const res = await getConversations();

            const conversationList = res.data;

            setConversations(conversationList);

            if (location.state?.conversation) {
                openConversation(location.state.conversation);
            } else if (conversationList.length > 0) {
                openConversation(conversationList[0]);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) return;

        socket.emit("join", user._id);

        fetchConversations();
    }, [user]);

    useEffect(() => {
        const receiveMessage = (newMessage) => {
            if (
                selectedConversation &&
                newMessage.conversation === selectedConversation._id
            ) {
                setMessages((prev) => [...prev, newMessage]);
            }
        };

        socket.on("receive_message", receiveMessage);

        return () => {
            socket.off("receive_message", receiveMessage);
        };
    }, [selectedConversation]);

    const handleSendMessage = () => {
        if (!message.trim()) return;

        if (!selectedConversation) return;

        const otherUser = selectedConversation.participants.find(
            (participant) => participant._id !== user._id
        );

        socket.emit("send_message", {
            conversationId: selectedConversation._id,
            sender: user._id,
            receiver: otherUser._id,
            text: message,
        });

        setMessage("");
    };

    return (
        <section className="flex h-[calc(100vh-120px)] overflow-hidden rounded-3xl border border-gray-200 bg-white">

            {/* Sidebar */}

            <aside className="w-80 border-r border-gray-200">

                <div className="border-b border-gray-200 p-6">
                    <h2 className="text-xl font-semibold">
                        Student Chats
                    </h2>
                </div>

                <div className="p-4 space-y-3">

                    {loading && (
                        <p className="text-center text-gray-500">
                            Loading...
                        </p>
                    )}

                    {!loading && conversations.length === 0 && (
                        <p className="text-center text-gray-500">
                            No conversations yet.
                        </p>
                    )}

                    {!loading &&
                        conversations.map((conversation) => {

                            const otherUser = conversation.participants.find(
                                (participant) =>
                                    participant._id !== user._id
                            );

                            return (
                                <div
                                    key={conversation._id}
                                    onClick={() =>
                                        openConversation(conversation)
                                    }
                                    className={`cursor-pointer rounded-2xl border p-4 hover:bg-slate-50 ${
                                        selectedConversation?._id ===
                                        conversation._id
                                            ? "border-indigo-600 bg-indigo-50"
                                            : "border-gray-100"
                                    }`}
                                >
                                    <h3 className="font-semibold">
                                        {otherUser.fullName}
                                    </h3>

                                    <p className="text-sm text-gray-500 capitalize">
                                        {otherUser.role}
                                    </p>
                                </div>
                            );
                        })}
                </div>
            </aside>

            {/* Chat Window */}

            <div className="flex flex-1 flex-col">

                <div className="flex-1 space-y-4 overflow-y-auto p-6">

                    {messages.map((msg) => (
                        <div
                            key={msg._id}
                            className={`flex ${
                                msg.sender._id === user._id
                                    ? "justify-end"
                                    : "justify-start"
                            }`}
                        >
                            <div
                                className={`max-w-xs rounded-xl px-4 py-2 ${
                                    msg.sender._id === user._id
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 p-5">

                    <div className="flex gap-4">

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            placeholder="Start typing..."
                            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-indigo-600"
                        />

                        <button
                            onClick={handleSendMessage}
                            className="rounded-xl bg-indigo-600 px-5 text-white hover:bg-indigo-700"
                        >
                            <Send size={20} />
                        </button>

                    </div>

                </div>

            </div>

        </section>
    );
};

export default MentorChat;