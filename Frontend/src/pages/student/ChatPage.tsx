
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, SendIcon } from '@components/icons';
import { sendMessage, startChat } from '../../services/geminiService';

interface Message {
  sender: 'user' | 'ai';
  text: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hi Sarah, how are you feeling today? Remember, I'm here to support you in a safe and confidential space." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startChat();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const aiMessage: Message = { sender: 'ai', text: "" };
    setMessages(prev => [...prev, aiMessage]);

    try {
      let fullResponse = "";
      for await (const chunk of sendMessage(input)) {
        fullResponse += chunk;
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = fullResponse;
            return newMessages;
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = "I'm having trouble connecting right now. Please try again later.";
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center font-sans p-4">
        <div className="w-full max-w-3xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col">
            <header className="p-4 border-b flex justify-between items-center">
                 <Link to="/student/dashboard" className="flex items-center space-x-2">
                    <img src="https://picsum.photos/seed/ai-chat-avatar/40/40" alt="AI Avatar" className="w-10 h-10 rounded-full" />
                    <div>
                        <p className="font-bold text-text-dark">AI Assistant</p>
                        <p className="text-sm text-green-500">● Online</p>
                    </div>
                </Link>
                <button className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg text-sm">Crisis Support</button>
            </header>
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            {msg.sender === 'ai' && <img src="https://picsum.photos/seed/ai-chat-avatar/40/40" alt="AI" className="w-8 h-8 rounded-full"/>}
                            <div className={`max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-text-dark rounded-bl-none'}`}>
                                <p>{msg.text}</p>
                            </div>
                            {msg.sender === 'user' && <img src="https://picsum.photos/seed/sarah/40/40" alt="User" className="w-8 h-8 rounded-full"/>}
                        </div>
                    ))}
                    {isLoading && messages[messages.length-1].sender === 'ai' && (
                       <div className="flex items-end gap-3 justify-start">
                           <img src="https://picsum.photos/seed/ai-chat-avatar/40/40" alt="AI" className="w-8 h-8 rounded-full"/>
                            <div className="max-w-md p-3 rounded-2xl bg-gray-200 text-text-dark rounded-bl-none">
                                <div className="flex space-x-1">
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <footer className="p-4 border-t">
                <form onSubmit={handleSend} className="flex items-center space-x-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 bg-gray-100 border-transparent rounded-full py-3 px-5 focus:ring-primary focus:border-primary"
                        disabled={isLoading}
                    />
                    <button type="submit" className="bg-primary text-white p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-400" disabled={isLoading || !input.trim()}>
                        <SendIcon className="h-6 w-6"/>
                    </button>
                </form>
            </footer>
        </div>
    </div>
  );
};

export default ChatPage;
