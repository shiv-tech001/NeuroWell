import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { LogoIcon, SendIcon } from '@components/icons';
import { sendMessageToAI, getFallbackResponse, type Message as ChatMessage } from '../../services/chatService';
import { chatStorage } from '../../utils/chatStorage';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const ChatPage: React.FC = () => {
  const loadMessagesFromStorage = (): Message[] => {
    const savedMessages = chatStorage.loadMessages('chatPageMessages');
    if (savedMessages.length > 0) {
      return savedMessages;
    }
    return [
      { id: '1', sender: 'ai', text: "Hi! How are you feeling today? Remember, I'm here to support you in a safe and confidential space." }
    ];
  };

  const [messages, setMessages] = useState<Message[]>(loadMessagesFromStorage());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatStorage.saveMessages(messages, 'chatPageMessages');
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input
    };
    setMessages(prev => [...prev, userMessage]);

    const messageToSend = input;
    setInput('');
    setIsLoading(true);

    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: ''
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      const conversationHistory: ChatMessage[] = messages.map(msg => ({
        id: msg.id,
        type: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
        timestamp: new Date().toLocaleTimeString()
      }));

      const response = await sendMessageToAI(messageToSend, conversationHistory);

      let aiResponseText = '';
      if (response.success && response.data) {
        aiResponseText = response.data.response;
      } else {
        const fallback = getFallbackResponse(messageToSend);
        aiResponseText = fallback.response;
      }

      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = aiResponseText;
        return newMessages;
      });

    } catch (error) {
      console.error('Error sending message:', error);
      const fallback = getFallbackResponse(messageToSend);
      setMessages(prev => {
        const newMessages = [...prev];
        newMessages[newMessages.length - 1].text = fallback.response;
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-2 sm:p-4">
      <div className="flex flex-col w-full h-full max-w-[100vw] sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl bg-white rounded-none sm:rounded-2xl shadow-none sm:shadow-2xl overflow-hidden">
        
        {/* Header */}
        <header className="p-3 sm:p-4 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
          <Link to="/student/dashboard" className="flex items-center space-x-2 sm:space-x-3 w-full sm:w-auto">
            <img 
              src="https://picsum.photos/seed/ai-chat-avatar/40/40" 
              alt="AI Avatar" 
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0" 
            />
            <div className="min-w-0">
              <p className="font-bold text-text-dark text-sm sm:text-base truncate">AI Assistant</p>
              <p className="text-xs sm:text-sm text-green-500">● Online</p>
            </div>
          </Link>
          <button className="bg-red-100 text-red-600 font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm whitespace-nowrap">
            Crisis Support
          </button>
        </header>

        {/* Messages Container */}
        <div className="flex-1 p-3 sm:p-4 lg:p-6 overflow-y-auto bg-gray-50">
          <div className="space-y-4 sm:space-y-6">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex items-end gap-2 sm:gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <img 
                    src="https://picsum.photos/seed/ai-chat-avatar/40/40" 
                    alt="AI" 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                  />
                )}
                <div 
                  className={`max-w-[75%] sm:max-w-[70%] md:max-w-md p-2.5 sm:p-3 rounded-2xl break-words ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-none' 
                      : 'bg-gray-200 text-text-dark rounded-bl-none'
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{msg.text}</p>
                </div>
                {msg.sender === 'user' && (
                  <img 
                    src="https://picsum.photos/seed/sarah/40/40" 
                    alt="User" 
                    className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                  />
                )}
              </div>
            ))}
            {isLoading && messages[messages.length-1]?.sender === 'ai' && (
              <div className="flex items-end gap-2 sm:gap-3 justify-start">
                <img 
                  src="https://picsum.photos/seed/ai-chat-avatar/40/40" 
                  alt="AI" 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                />
                <div className="max-w-[75%] sm:max-w-[70%] md:max-w-md p-2.5 sm:p-3 rounded-2xl bg-gray-200 text-text-dark rounded-bl-none">
                  <div className="flex space-x-1">
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-gray-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Footer */}
        <footer className="p-3 sm:p-4 border-t bg-white">
          <form onSubmit={handleSend} className="flex items-center space-x-2 sm:space-x-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-100 border-transparent rounded-full py-2.5 px-4 sm:py-3 sm:px-5 text-sm sm:text-base focus:ring-primary focus:border-primary focus:outline-none"
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="bg-primary text-white p-2.5 sm:p-3 rounded-full hover:bg-blue-600 disabled:bg-gray-400 transition-colors flex-shrink-0 touch-manipulation" 
              disabled={isLoading || !input.trim()}
            >
              <SendIcon className="h-5 w-5 sm:h-6 sm:w-6"/>
            </button>
          </form>
        </footer>
      </div>
    </div>
  );
};

export default ChatPage;
