import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';


// Icon Components
const SendIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
    </svg>
);

const MicrophoneIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd"/>
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
    timestamp: string;
}

const AIChatbotPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            type: 'assistant',
            content: "Hello! I'm your friendly AI assistant. How are you feeling today? I'm here to listen and help.",
            timestamp: '10:30 AM',
        }
    ]);

    const [currentMessage, setCurrentMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const sessions: Session[] = [
        { id: '1', title: 'Check-in', timestamp: '10:30 AM' },
        { id: '2', title: 'Stress Management', timestamp: 'Yesterday, 2:15 PM' },
        { id: '3', title: 'Anxiety Relief', timestamp: '2 days ago, 11:00 AM' },
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async () => {
        if (!currentMessage.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: currentMessage,
            timestamp: 'You',
        };

        setMessages(prev => [...prev, userMessage]);
        setCurrentMessage('');
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                type: 'assistant',
                content: "I understand. It's common to feel overwhelmed. We can explore some strategies to manage stress. 😊",
                timestamp: 'AI Assistant',
                suggestions: ['Mindfulness exercises', 'Talk to a peer']
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsTyping(false);
        }, 1500);
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

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            

            {/* Main Content */}
            <div className="flex-1 flex">
                {/* Sidebar - Session History */}
                <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900">Session History</h2>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto">
                        {sessions.map((session, index) => (
                            <div key={session.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${index === 0 ? 'bg-purple-50 border-l-4 border-l-purple-600' : ''}`}>
                                <h3 className="font-semibold text-gray-900">{session.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">{session.timestamp}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                <img 
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                                    alt="AI Assistant" 
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">AI Assistant</h3>
                                <div className="flex items-center">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                    <span className="text-sm text-gray-500">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {messages.map((message) => (
                            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                    {/* Avatar */}
                                    <div className="flex-shrink-0">
                                        {message.type === 'assistant' ? (
                                            <img 
                                                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                                                alt="AI Assistant" 
                                                className="w-10 h-10 rounded-full"
                                            />
                                        ) : (
                                            <img 
                                                src="https://images.unsplash.com/photo-1494790108755-2616b612b3fd?w=40&h=40&fit=crop&crop=face" 
                                                alt="You" 
                                                className="w-10 h-10 rounded-full"
                                            />
                                        )}
                                    </div>

                                    {/* Message Content */}
                                    <div className={`flex flex-col ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                                        <div className={`px-4 py-3 rounded-2xl max-w-md ${
                                            message.type === 'user' 
                                                ? 'bg-purple-600 text-white' 
                                                : 'bg-gray-100 text-gray-900'
                                        }`}>
                                            <p className="text-sm">{message.content}</p>
                                        </div>
                                        
                                        {/* Timestamp */}
                                        <span className="text-xs text-gray-500 mt-1 px-2">{message.timestamp}</span>
                                        
                                        {/* Suggestions */}
                                        {message.suggestions && (
                                            <div className="flex flex-wrap gap-2 mt-3">
                                                {message.suggestions.map((suggestion, index) => (
                                                    <button
                                                        key={index}
                                                        onClick={() => handleSuggestionClick(suggestion)}
                                                        className="px-3 py-1 text-sm bg-white border border-purple-200 text-purple-600 rounded-full hover:bg-purple-50 transition"
                                                    >
                                                        {suggestion}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="flex items-start space-x-3 max-w-3xl">
                                    <img 
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face" 
                                        alt="AI Assistant" 
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <div className="bg-gray-100 px-4 py-3 rounded-2xl">
                                        <div className="flex space-x-1">
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Message Input */}
                    <div className="bg-white border-t border-gray-200 p-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-1 relative">
                                <input
                                    type="text"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                />
                                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                                    <MicrophoneIcon className="w-5 h-5" />
                                </button>
                            </div>
                            <button
                                onClick={handleSendMessage}
                                disabled={!currentMessage.trim()}
                                className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <SendIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default AIChatbotPage;
