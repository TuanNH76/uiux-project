import React, { useState, useEffect, useRef } from 'react';
import { Paper, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import './Chatbot.css';

const theme = createTheme({
    palette: {
        primary: {
            main: '#4F4FFF',
        },
    },
});

const Assistant = () => {
    const [messages, setMessages] = useState([]);
    const [userMessage, setUserMessage] = useState('');
    const [isBotTyping, setIsBotTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const handleSendMessage = async () => {
        if (userMessage.trim() !== '') {
            const newMessage = { sender: 'user', text: userMessage };
            setMessages([...messages, newMessage]);
            setUserMessage('');

            setIsBotTyping(true); // Show typing indicator

            try {
                const response = await axios.post('http://localhost:8080/api/chat', {
                    user: 'haha', // default user
                    question: userMessage,
                });

                const data = response.data;
                const botResponseText = data.content.replace(/\n/g, '<br />'); // Replace all \n with <br />
                const botResponse = { sender: 'bot', text: botResponseText };
                setMessages(prevMessages => [...prevMessages, botResponse]);
            } catch (error) {
                const errorMessage = { sender: 'bot', text: 'There was an error processing your request.' };
                setMessages(prevMessages => [...prevMessages, errorMessage]);
            } finally {
                setIsBotTyping(false); // Hide typing indicator
            }
        }
    };

    const handleUserMessageChange = (event) => {
        setUserMessage(event.target.value);
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <ThemeProvider theme={theme}>
            <Paper className="chatbot-container">
                <Typography variant="h5" className="chatbot-title">Assistant</Typography>
                <List className="chatbot-messages">
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            className={message.sender === 'user' ? 'user-message-container' : 'bot-message-container'}
                        >
                            {message.sender === 'user' ? (
                                <ListItemText primary={message.text} className="user-message" />
                            ) : (
                                <ListItemText
                                    primary={
                                        <span dangerouslySetInnerHTML={{ __html: message.text }} /> // Render as HTML
                                    }
                                    className="bot-message"
                                />
                            )}
                        </ListItem>
                    ))}
                    {isBotTyping && (
                        <ListItem className="bot-message-container">
                            <div className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </ListItem>
                    )}
                    <div ref={messagesEndRef} />
                </List>
                <div className="chatbot-input-container">
                    <TextField
                        value={userMessage}
                        onChange={handleUserMessageChange}
                        placeholder="Type your message..."
                        fullWidth
                        InputProps={{
                            style: { borderColor: '#4F4FFF' },
                        }}
                    />
                    <Button onClick={handleSendMessage} variant="contained" color="primary">
                        Send
                    </Button>
                </div>
            </Paper>
        </ThemeProvider>
    );
};

export default Assistant;
