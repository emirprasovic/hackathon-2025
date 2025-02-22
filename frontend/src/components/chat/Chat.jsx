import React, { useState, useEffect, useRef } from 'react';
import './Chat.css';

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
                    'Authorization': `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`,
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
                className="chat-bubble"
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
                <div className="chat-container">
                    <div className="chat-window">
                        <div className="chat-header">
                            <h3>Chat Assistant</h3>
                            <button 
                                className="close-btn"
                                onClick={() => setIsChatOpen(false)}
                            >
                                &times;
                            </button>
                        </div>
                        
                        <div className="chat-messages">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`message ${msg.isUser ? 'user' : 'bot'}`}
                                >
                                    <div className="message-content">
                                        <strong>{msg.isUser ? 'You' : 'Bot'}:</strong>
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="chat-input">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                disabled={isLoading}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <button
                                onClick={sendMessage}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Sending...' : 'Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Chat;