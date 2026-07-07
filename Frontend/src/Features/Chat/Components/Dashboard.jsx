import { useEffect, useState } from "react";
import useChat from "../Hooks/useChat";

const initialChats = [
    { id: "chat-1", title: "Product launch", preview: "Summarize the latest feature rollout plan.", time: "2m ago", unread: true },
    { id: "chat-2", title: "Customer insights", preview: "Analyze the support trends for Q3.", time: "18m ago", unread: false },
    { id: "chat-3", title: "Marketing ideas", preview: "Create a campaign plan for a new release.", time: "1h ago", unread: false },
];

const initialMessagesByChat = {
    "chat-1": [
        { id: 1, role: "assistant", content: "I can help you shape a polished launch strategy. What part would you like to focus on first?", time: "09:41" },
        { id: 2, role: "user", content: "Give me a concise summary of the rollout plan.", time: "09:42" },
    ],
    "chat-2": [
        { id: 3, role: "assistant", content: "I’ve pulled the latest support patterns and highlighted the biggest opportunities.", time: "08:54" },
    ],
    "chat-3": [
        { id: 4, role: "assistant", content: "A strong campaign idea is ready. I can refine it for your audience next.", time: "07:20" },
    ],
};

const quickPrompts = ["Summarize this thread", "Draft a launch email", "Suggest next steps"];

const Dashboard = () => {
    const { socketConnectionHandler, sendQueryHandler } = useChat();
    const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
    const [draft, setDraft] = useState("");
    const [messagesByChat, setMessagesByChat] = useState(initialMessagesByChat);

    useEffect(() => {
        const services = socketConnectionHandler();
        if (typeof services === "function") {
            services();
        }
    }, []);

    const activeChat = initialChats.find((chat) => chat.id === activeChatId) || initialChats[0];
    const messages = messagesByChat[activeChatId] || [];

    const handleSend = async (event) => {
        event.preventDefault();
        const trimmed = draft.trim();
        if (!trimmed) return;

        const userMessage = {
            id: Date.now(),
            role: "user",
            content: trimmed,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        const assistantReply = {
            id: Date.now() + 1,
            role: "assistant",
            content: "I’ve captured that and can turn it into a polished response for your next step.",
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        await sendQueryHandler(trimmed);

        setMessagesByChat((prev) => ({
            ...prev,
            [activeChatId]: [...(prev[activeChatId] || []), userMessage, assistantReply],
        }));
        setDraft("");
    };

    return (
        <div className="min-h-full bg-[#0A0A0A] px-3 text-white sm:px-4 sm:py-4 lg:px-6 ">
            <div className="mx-auto flex h-[calc(100vh-1.5rem)] max-w-full flex-col overflow-hidden rounded-[28px] border border-[#3c3c3c] bg-[#111111] shadow-[0_0_40px_rgba(0,0,0,0.35)]">
                <div className="flex flex-1 flex-col lg:flex-row">
                    <aside className="w-full border-b border-[#232323] bg-[#0f0f0f]/90 p-4 lg:w-[320px] lg:border-b-0 lg:border-r lg:p-5">
                        <div className="flex items-center gap-2.5">
                            <img className="h-10 w-10" src="../../../../public/images/AppLogo.png" alt="AskBase logo" />
                            <div>
                                <p className="text-lg font-semibold tracking-tight text-white">AskBase</p>
                                <p className="text-xs uppercase tracking-[0.25em] text-[#888887]">AI workspace</p>
                            </div>
                        </div>

                        <button className="mt-5 w-full rounded-xl border border-[#F5FF3A]/40 bg-[#F5FF3A] px-4 py-3 text-sm font-semibold text-[#0A0A0A] transition hover:brightness-110">
                            + New chat
                        </button>

                        <div className="mt-6 flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#888887]">Recent chats</p>
                            <button className="text-xs text-[#F5FF3A] transition hover:text-[#ABD600]">View all</button>
                        </div>

                        <div className="mt-3 space-y-2">
                            {initialChats.map((chat) => (
                                <button
                                    key={chat.id}
                                    onClick={() => setActiveChatId(chat.id)}
                                    className={`w-full rounded-2xl border px-3 py-3 text-left transition ${activeChatId === chat.id ? "border-[#F5FF3A]/40 bg-[#1A1A1A]" : "border-transparent bg-[#151515] hover:border-[#3c3c3c]"}`}
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="truncate text-sm font-semibold text-white">{chat.title}</p>
                                        {chat.unread && <span className="h-2.5 w-2.5 rounded-full bg-[#F5FF3A]" />}
                                    </div>
                                    <p className="mt-1 truncate text-xs text-[#888887]">{chat.preview}</p>
                                    <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#6b7280]">{chat.time}</p>
                                </button>
                            ))}
                        </div>
                    </aside>

                    <main className="flex flex-1 flex-col">
                        <header className="flex items-center justify-between border-b border-[#232323] px-4 py-4 sm:px-6">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#888887]">Active conversation</p>
                                <h2 className="mt-1 text-xl font-semibold text-white">{activeChat.title}</h2>
                            </div>
                            <div className="rounded-full border border-[#3c3c3c] bg-[#151515] px-3 py-1.5 text-xs uppercase tracking-[0.25em] text-[#F5FF3A]">
                                Live draft
                            </div>
                        </header>

                        <section className="flex-1 overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
                            <div className="mx-auto flex max-w-3xl flex-col gap-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[85%] rounded-2xl border px-4 py-3 shadow-sm ${message.role === "user"
                                                ? "border-[#F5FF3A]/30 bg-[#F5FF3A] text-[#0A0A0A]"
                                                : "border-[#3c3c3c] bg-[#161616] text-[#f5f5f5]"
                                                }`}
                                        >
                                            <p className="text-sm leading-6">{message.content}</p>
                                            <p className={`mt-2 text-[11px] uppercase tracking-[0.2em] ${message.role === "user" ? "text-[#0A0A0A]/70" : "text-[#888887]"}`}>
                                                {message.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <footer className="border-t border-[#232323] px-4 py-4 sm:px-6 sm:py-5">
                            <div className="mx-auto flex max-w-3xl flex-col gap-3">
                                <div className="flex flex-wrap gap-2">
                                    {quickPrompts.map((prompt) => (
                                        <button
                                            key={prompt}
                                            type="button"
                                            onClick={() => setDraft(prompt)}
                                            className="rounded-full border border-[#3c3c3c] bg-[#161616] px-3 py-1.5 text-sm text-[#C8C6C5] transition hover:border-[#F5FF3A]/40 hover:text-[#F5FF3A]"
                                        >
                                            {prompt}
                                        </button>
                                    ))}
                                </div>

                                <form onSubmit={handleSend} className="rounded-2xl border border-[#3c3c3c] bg-[#161616] p-2">
                                    <div className="flex items-center gap-2">
                                        <input
                                            value={draft}
                                            onChange={(event) => setDraft(event.target.value)}
                                            placeholder="Ask anything..."
                                            className="flex-1 border-none bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-[#888887]"
                                        />
                                        <button
                                            type="submit"
                                            className="rounded-xl bg-[#F5FF3A] p-3 text-[#0A0A0A] transition hover:brightness-110"
                                            aria-label="Send message"
                                        >
                                            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M5 12h14" strokeLinecap="round" />
                                                <path d="m12 5 7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </footer>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
