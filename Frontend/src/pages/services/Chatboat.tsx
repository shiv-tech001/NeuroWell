import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { sendMessageToAI as sendChatMessage } from '../../services/chatService';

// Icon Components
const SendIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
    </svg>
);

const MicrophoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 715 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
    </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
    </svg>
);

// Message type definition
interface Message {
    id: string;
    type: 'user' | 'assistant';
    content: string;
    timestamp: string;
    suggestions?: string[];
}

// Session history type
interface Session {
    id: string;
    title: string;
    messages: Message[];
}

const Chatboat: React.FC = () => {
    // State variables
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [allSessions, setAllSessions] = useState<Session[]>([{
        id: uuidv4(),
        title: 'Welcome Chat',
        messages: [
            {
                id: uuidv4(),
                type: 'assistant',
                content: "Hello! I'm your friendly AI assistant. How are you feeling today? I'm here to listen and help.",
                timestamp: '10:30 AM',
            }
        ],
    }]);
    const [activeSessionId, setActiveSessionId] = useState<string | null>(allSessions[0]?.id || null);
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
    const messagesScrollRef = useRef<HTMLDivElement>(null);
    const prevMessagesLengthRef = useRef(0);

    // Rename session
    const handleRenameSession = (sessionId: string, newName: string) => {
        setAllSessions(prev => prev.map(s =>
            s.id === sessionId ? { ...s, title: newName } : s
        ));
        setOpenDropdownId(null);
    };

    // Delete session
    const handleDeleteSession = (sessionId: string) => {
        setAllSessions(prev => {
            const filtered = prev.filter(s => s.id !== sessionId);
            // If deleted session was active, set active to first or null
            if (activeSessionId === sessionId) {
                setActiveSessionId(filtered[0]?.id || null);
            }
            return filtered;
        });
        setOpenDropdownId(null);
    };

    useEffect(() => {
        if (allSessions.length && activeSessionId === null) {
            setActiveSessionId(allSessions[0].id);
        }
    }, [allSessions, activeSessionId]);

    // Get active session messages
    const activeSession = allSessions.find(s => s.id === activeSessionId);
    const messages = activeSession ? activeSession.messages : [];

    // Only scroll to bottom when messages are added, not on initial load or session switch
    useEffect(() => {
        if (shouldScrollToBottom && messagesScrollRef.current) {
            messagesScrollRef.current.scrollTop = messagesScrollRef.current.scrollHeight;
            setShouldScrollToBottom(false);
        }
        
        // Update the previous messages length
        prevMessagesLengthRef.current = messages.length;
    }, [messages, shouldScrollToBottom]);

    // Watch for new messages being added to trigger scroll
    useEffect(() => {
        if (messages.length > prevMessagesLengthRef.current) {
            setShouldScrollToBottom(true);
        }
    }, [messages.length]);

    const handleSendMessage = async () => {
        if (!currentMessage.trim() || !activeSessionId) return;
        
        const userMessage: Message = {
            id: uuidv4(),
            type: 'user',
            content: currentMessage,
            timestamp: 'You',
        };
        
        setAllSessions(prev => prev.map(s =>
            s.id === activeSessionId
                ? { ...s, messages: [...s.messages, userMessage] }
                : s
        ));
        const messageToSend = currentMessage;
        setCurrentMessage('');
        setIsTyping(true);
        
        // Trigger scroll for user message
        setShouldScrollToBottom(true);
        
        try {
            const chatResponse = await sendChatMessage(messageToSend, messages);
            if (chatResponse.success && chatResponse.data) {
                const aiResponse: Message = {
                    id: uuidv4(),
                    type: 'assistant',
                    content: chatResponse.data.response,
                    timestamp: 'AI Assistant',
                    suggestions: chatResponse.data.suggestions,
                };
                setAllSessions(prev => prev.map(s =>
                    s.id === activeSessionId
                        ? { ...s, messages: [...s.messages, aiResponse] }
                        : s
                ));
            } else {
                throw new Error('Failed to get response from AI');
            }
        } catch (error) {
            console.error("Failed to send message:", error);
            const errorResponse: Message = {
                id: uuidv4(),
                type: 'assistant',
                content: "Sorry, I'm having trouble connecting. Please try again later.",
                timestamp: 'AI Assistant',
            };
            setAllSessions(prev => prev.map(s =>
                s.id === activeSessionId
                    ? { ...s, messages: [...s.messages, errorResponse] }
                    : s
            ));
        } finally {
            setIsTyping(false);
            // Trigger scroll for AI response
            setShouldScrollToBottom(true);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setCurrentMessage(suggestion);
    };

    // Handle session switching without auto-scroll
    const handleSessionClick = (sessionId: string) => {
        setActiveSessionId(sessionId);
        // Don't trigger auto-scroll when switching sessions
        setShouldScrollToBottom(false);
    };

    // Handle new session creation
    const handleCreateNewSession = () => {
        const newSession: Session = {
            id: uuidv4(),
            title: 'New Chat',
            messages: [
                {
                    id: uuidv4(),
                    type: 'assistant',
                    content: "Hello! I'm your friendly AI assistant. How are you feeling today? I'm here to listen and help.",
                    timestamp: '10:30 AM',
                }
            ],
        };
        setAllSessions(prev => [newSession, ...prev]);
        setActiveSessionId(newSession.id);
        // Don't auto-scroll for new sessions
        setShouldScrollToBottom(false);
    };

    return (
        <div className="h-screen bg-gray-50 flex overflow-hidden relative">
            {/* Sidebar for larger screens */}
            <div className="hidden md:flex w-80 bg-white border-r border-gray-200 flex-col">
                {/* Sidebar content */}
                <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900">Session History</h2>
                    <button
                        onClick={handleCreateNewSession}
                        className="ml-2 p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600"
                        title="New Chat"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {allSessions.map((session) => (
                        <div 
                            key={session.id} 
                            className={`relative p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer ${session.id === activeSessionId ? 'bg-purple-50 border-l-4 border-l-purple-600' : 'hover:bg-gray-50'}`}
                            onClick={() => handleSessionClick(session.id)}
                        >
                            <h3 className="font-semibold text-gray-900">{session.title}</h3>
                            <button
                                className="p-1 rounded-full hover:bg-gray-200"
                                onClick={e => {
                                    e.stopPropagation();
                                    setOpenDropdownId(openDropdownId === session.id ? null : session.id);
                                }}
                            >
                                {/* Three-dot icon */}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <circle cx="5" cy="12" r="2" />
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="19" cy="12" r="2" />
                                </svg>
                            </button>
                            {/* Dropdown menu */}
                            {openDropdownId === session.id && (
                                <div className="absolute right-8 top-10 z-10 bg-white border border-gray-200 rounded shadow-md py-1 w-32">
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                                        onClick={e => {
                                            e.stopPropagation();
                                            const newName = window.prompt('Enter new chat name:', session.title);
                                            if (newName && newName.trim()) {
                                                handleRenameSession(session.id, newName.trim());
                                            } else {
                                                setOpenDropdownId(null);
                                            }
                                        }}
                                    >Rename</button>
                                    <button
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        onClick={e => {
                                            e.stopPropagation();
                                            if (window.confirm('Are you sure you want to delete this chat?')) {
                                                handleDeleteSession(session.id);
                                            } else {
                                                setOpenDropdownId(null);
                                            }
                                        }}
                                    >Delete Chat</button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar for mobile - drawer */}
            {isSidebarOpen && (
                <div className="fixed inset-0 z-30 md:hidden">
                    <div className="absolute inset-0 bg-gray-600 opacity-75" onClick={() => setIsSidebarOpen(false)}></div>
                    <div className="relative w-80 bg-white h-full border-r border-gray-200 flex flex-col">
                        {/* Sidebar content */}
                        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-900">Session History</h2>
                            <button
                                onClick={handleCreateNewSession}
                                className="ml-2 p-2 rounded-full bg-purple-100 hover:bg-purple-200 text-purple-600"
                                title="New Chat"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            {allSessions.map((session) => (
                                <div 
                                    key={session.id} 
                                    className={`relative p-4 border-b border-gray-100 flex items-center justify-between cursor-pointer ${session.id === activeSessionId ? 'bg-purple-50 border-l-4 border-l-purple-600' : 'hover:bg-gray-50'}`}
                                    onClick={() => {
                                        handleSessionClick(session.id);
                                        setIsSidebarOpen(false);
                                    }}
                                >
                                    <h3 className="font-semibold text-gray-900">{session.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            
            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col h-screen">
                {/* Header with menu button for mobile */}
                <div className="p-4 border-b border-gray-200 flex items-center justify-between md:hidden">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    </button>
                    <h2 className="text-lg font-bold text-gray-900">
                        {activeSession ? activeSession.title : 'Chat'}
                    </h2>
                    <div className="w-8"></div> {/* Spacer */}
                </div>

                {/* Chat messages */}
                <div ref={messagesScrollRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 bg-gray-50" style={{ minHeight: 0 }}>
                    {messages.map(msg => (
                        <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-lg px-4 py-2 rounded-lg shadow ${msg.type === 'user' ? 'bg-purple-600 text-white' : 'bg-white text-gray-900 border'}`}>
                                <div className="text-sm">{msg.content}</div>
                                <div className="text-xs text-gray-400 mt-1">{msg.timestamp}</div>
                                {msg.suggestions && (
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {msg.suggestions.map(suggestion => (
                                            <button key={suggestion} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs hover:bg-purple-200" onClick={() => handleSuggestionClick(suggestion)}>
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start items-end">
                            <div className="flex items-end mr-2">
                                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center border border-purple-300">
                                    <UserIcon className="h-6 w-6 text-purple-600" />
                                </div>
                            </div>
                            <div className="max-w-lg px-4 py-2 rounded-lg shadow bg-white text-gray-900 border animate-pulse">
                                <div className="text-sm">AI Assistant is typing...</div>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Message input */}
                <div className="p-4 md:p-6 border-t border-gray-200 flex items-center gap-4 bg-white">
                    <textarea
                        className="flex-1 resize-none rounded-lg border border-gray-300 p-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        rows={1}
                        placeholder="Type your message..."
                        value={currentMessage}
                        onChange={e => setCurrentMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                    />
                    <button
                        className="p-3 rounded-full bg-purple-600 text-white hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleSendMessage}
                        disabled={!currentMessage.trim() || isTyping}
                        title="Send"
                    >
                        <SendIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Chatboat;
