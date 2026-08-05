import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import socket from "../../services/socket";

import {
    getConversations,
    getMessages,
} from "../../services/chat.service";

import { useAuth } from "../../context/AuthContext";



const Chat = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const { user } = useAuth();

const location = useLocation();

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
    console.log("Joining socket:", user._id);

socket.on("connect", () => {
    console.log("Socket Connected:", socket.id);
});

    fetchConversations();
}, [user]);

const openConversation = async (conversation) => {
    setSelectedConversation(conversation);

    try {
        const res = await getMessages(conversation._id);

        setMessages(res.data);
    } catch (error) {
        console.log(error);
    }
};

useEffect(() => {

    socket.on("receive_message", (newMessage) => {

        setMessages((prev) => [...prev, newMessage]);

    });

    return () => {

        socket.off("receive_message");

    };

}, []);

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

            <aside className="w-80 border-r border-gray-200">

                <div className="border-b border-gray-200 p-6">

                    <h2 className="text-xl font-semibold">
                        Chats
                    </h2>

                </div>

                <div className="p-4">

                    <div className="cursor-pointer rounded-2xl bg-slate-50 p-4">

                        <h3 className="font-semibold">
                            Rahul Sharma
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                            Google
                        </p>

                    </div>

                </div>

            </aside>

            <div className="flex flex-1 flex-col">

              <div className="p-4 space-y-3">

                    {conversations.map((conversation) => {

                        const otherUser = conversation.participants.find(
                            (participant) => participant._id !== user._id
                        );

                        return (

                            <div
                                key={conversation._id}
                                onClick={() => openConversation(conversation)}
                                className="cursor-pointer rounded-2xl border border-gray-100 p-4 hover:bg-slate-50"
                            >
                                <h3 className="font-semibold">
                                    {otherUser.fullName}
                                </h3>

                                <p className="text-sm text-gray-500">
                                    {otherUser.role}
                                </p>

                            </div>

                        );

                    })}

                </div>

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
                            onChange={(e) => setMessage(e.target.value)}
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

export default Chat;