import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function ChatWindow({ activeChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (activeChat) {
      if (activeChat.type === 'channel') {
        apiService.getChannelMessages(activeChat.id)
          .then(data => {
            console.log("Channel messages:", data);
            setMessages(data);
          })
          .catch(err => console.error("Error fetching channel messages:", err));
      } else if (activeChat.type === 'friend') {
        apiService.getPrivateMessages(1, activeChat.id)
          .then(data => {
            console.log("Private messages:", data);
            setMessages(data);
          })
          .catch(err => console.error("Error fetching private messages:", err));
      }
    } else {
      setMessages([]);
    }
  }, [activeChat]);

  const sendMessage = () => {
    console.log("sendMessage triggered, input:", input, "activeChat:", activeChat);
    if (!activeChat || input.trim() === '') return;
    if (activeChat.type === 'channel') {
      apiService.sendChannelMessage(1, activeChat.id, input)
        .then(msg => {
          console.log("Channel message sent:", msg);
          setMessages(prev => [...prev, msg]);
          setInput('');
        })
        .catch(err => console.error("Error sending channel message:", err));
    } else if (activeChat.type === 'friend') {
      apiService.sendPrivateMessage(1, activeChat.id, input)
        .then(msg => {
          console.log("Private message sent:", msg);
          setMessages(prev => [...prev, msg]);
          setInput('');
        })
        .catch(err => console.error("Error sending private message:", err));
    }
  };

  return (
    <div className="chat-window">
      <h2>{activeChat ? activeChat.name : "Select a chat"}</h2>
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.sender?.username || "Unknown"}:</strong> {msg.content}
          </div>
        ))}
      </div>
      {activeChat && (
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
