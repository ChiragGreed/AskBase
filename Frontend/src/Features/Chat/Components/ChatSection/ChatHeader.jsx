import React from 'react'

const ChatHeader = ({ currentChat, setSidebarOpenHandler }) => {
    return (
        <>
            <header className="shrink-0 flex items-center justify-between border-b border-[#1C1C1E] px-3 py-3 sm:px-8 sm:py-4 bg-[#0A0A0A]/80 backdrop-blur-md">
                <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Mobile hamburger */}
                    <button
                        type="button"
                        onClick={() => setSidebarOpenHandler(true)}
                        className="lg:hidden text-[#A1A1AA] hover:text-white transition-colors p-1"
                        aria-label="Open sidebar"
                    >
                        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
                        </svg>
                    </button>
                    <div className="min-w-0">
                        <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight truncate">
                            {currentChat?.title || "New Conversation"}
                        </h2>
                    </div>
                </div>
            </header>
        </>
    )
}

export default ChatHeader
