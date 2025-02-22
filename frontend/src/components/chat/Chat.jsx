import React, { useState, useEffect, useRef } from 'react';

const Chat = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;
        setIsLoading(true);
        try {
            const userMessage = { text: input, isUser: true };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInput('');

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "llama-3.1-8b-instant",
                    messages: [{ role: "user", content: input }],
                }),
            });

            if (!response.ok) throw new Error('Failed to fetch response from GROQ API');

            const data = await response.json();
            const botMessage = { 
                text: data.choices[0].message.content, 
                isUser: false 
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage = { 
                text: 'Failed to send message. Please try again.', 
                isUser: false 
            };
            setMessages((prevMessages) => [...prevMessages, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Floating Chat Bubble */}
            <div 
                className="fixed bottom-8 right-8 w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-700 shadow-lg transition-colors duration-200"
                onClick={() => setIsChatOpen(!isChatOpen)}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
                >
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
                </svg>
            </div>

            {/* Chat Interface */}
            {isChatOpen && (
                <div className="fixed bottom-24 right-8 w-[400px] h-[550px] bg-white rounded-xl shadow-2xl border border-gray-100">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center px-6 py-4 border-b border-gray-100">
                            <h3 className="text-lg font-semibold text-gray-800">Chat Assistant</h3>
                            <button 
                                className="ml-auto p-2 text-gray-400 hover:text-gray-600 transition-colors"
                                onClick={() => setIsChatOpen(false)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'} mb-4`}
                                >
                                    <div className={`max-w-[75%] rounded-lg px-4 py-3 ${
                                        msg.isUser 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-white shadow-sm border border-gray-100'
                                    }`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="px-4 py-4 bg-white border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Type a message..."
                                    disabled={isLoading}
                                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                                    className="flex-1 px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={isLoading}
                                    className="px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isLoading ? 'Sending...' : 'Send'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;