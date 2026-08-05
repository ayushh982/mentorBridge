import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { chatWithAI } from "../../services/ai.service";
import { useAuth } from "../../context/AuthContext";

const AIChatbot = () => {
    const { user, loading } = useAuth();
    if (loading) return null;

    if (!user) return null;

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([
        {
            sender: "ai",
            text: "👋 Hi! I'm your MentorBridge AI Assistant. How can I help you today?",
        },
    ]);

    const [aiLoading, setAiLoading] = useState(false);

    const handleSend = async () => {

        if (!message.trim()) return;

        const userMessage = {
            sender: "user",
            text: message,
        };

        setMessages((prev) => [...prev, userMessage]);

        const prompt = message;

        setMessage("");

        try {

            setAiLoading(true);

            const res = await chatWithAI(prompt);

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: res.data.reply,
                },
            ]);

        } catch {

            setMessages((prev) => [
                ...prev,
                {
                    sender: "ai",
                    text: "Something went wrong.",
                },
            ]);

        } finally {

            setAiLoading(false);

        }

    };

    return (
        <>
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 right-6 rounded-full bg-indigo-600 p-4 text-white shadow-lg"
                >
                    <MessageCircle />
                </button>
            )}

            {open && (
                <div className="fixed bottom-6 right-6 flex h-[500px] w-[340px] flex-col rounded-2xl border bg-white shadow-2xl">

                    <div className="flex items-center justify-between rounded-t-2xl bg-indigo-600 p-4 text-white">

                        <div>
                            <h2 className="font-semibold">
                                MentorBridge AI
                            </h2>

                            <p className="text-xs">
                                Personal Assistant
                            </p>
                        </div>

                        <button onClick={() => setOpen(false)}>
                            <X />
                        </button>

                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto p-4">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`max-w-[80%] rounded-xl p-3 ${
                                    msg.sender === "user"
                                        ? "ml-auto bg-indigo-600 text-white"
                                        : "bg-gray-100"
                                }`}
                            >
                                {msg.text}
                            </div>

                        ))}

                        {aiLoading && (
                            <div className="rounded-xl bg-gray-100 p-3">
                                Thinking...
                            </div>
                        )}

                    </div>

                    <div className="flex gap-2 border-t p-3">

                        <input
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) =>
                                e.key === "Enter" && handleSend()
                            }
                            placeholder="Ask anything..."
                            className="flex-1 rounded-lg border px-3 py-2 outline-none"
                        />

                        <button
                            onClick={handleSend}
                            className="rounded-lg bg-indigo-600 p-2 text-white"
                        >
                            <Send size={18} />
                        </button>

                    </div>

                </div>
            )}
        </>
    );
};

export default AIChatbot;