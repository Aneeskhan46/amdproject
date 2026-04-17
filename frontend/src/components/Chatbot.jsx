import { useState } from 'react';
import axios from 'axios';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([{ sender: 'bot', text: 'Hi! I am your AI Shopping Assistant. How can I help you today?' }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = input;
        setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
        setInput('');
        setLoading(true);

        try {
            const { data } = await axios.post('http://localhost:5000/api/ai/chat', { message: userMsg });
            setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
        } catch (error) {
            setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, I am having trouble connecting right now.' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 overflow-hidden border border-gray-100 mb-4 flex flex-col h-[500px]"
                    >
                        <div className="bg-primary p-4 text-white flex justify-between items-center">
                            <h3 className="font-bold flex items-center"><MessageSquare className="h-5 w-5 mr-2" /> AI Assistant</h3>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-700 p-1 rounded transition-colors">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50">
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-none'}`}>
                                        <p className="text-sm">{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="flex justify-start">
                                    <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-gray-100 shadow-sm text-gray-500 text-sm">
                                        Typing...
                                    </div>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center">
                            <input 
                                type="text" 
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-100 text-sm rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
                            />
                            <button type="submit" disabled={!input.trim() || loading} className="ml-2 bg-primary text-white p-2 rounded-full disabled:opacity-50">
                                <Send className="h-4 w-4" />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {!isOpen && (
                <button 
                    onClick={() => setIsOpen(true)}
                    className="bg-primary text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors flex items-center justify-center animate-bounce"
                >
                    <MessageSquare className="h-7 w-7" />
                </button>
            )}
        </div>
    );
};

export default Chatbot;
