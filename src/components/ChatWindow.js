import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function ChatWindow({ activeChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const userId = localStorage.getItem('userId'); // ID на текущия потребител
  const isAdmin = localStorage.getItem('isAdmin') === "true";

  useEffect(() => {
    if (activeChat) {
      if (activeChat.type === 'channel') {
        apiService.getChannelMessages(activeChat.id)
          .then(setMessages)
          .catch(console.error);
      } else if (activeChat.type === 'friend') {
        apiService.getPrivateMessages(userId, activeChat.id)
          .then(setMessages)
          .catch(console.error);
      }
    } else {
      setMessages([]);
    }
  }, [activeChat, userId]);

  const sendMessage = () => {
    if (!input.trim()) return;

    if (activeChat.type === 'channel') {
      apiService.sendChannelMessage(userId, activeChat.id, input)
        .then(msg => setMessages(prev => [...prev, msg]))
        .catch(console.error);
    } else if (activeChat.type === 'friend') {
      apiService.sendPrivateMessage(userId, activeChat.id, input)
        .then(msg => setMessages(prev => [...prev, msg]))
        .catch(console.error);
    }

    setInput('');
  };

  // Open Rename Modal
  const handleRenameChannel = () => {
    setShowRenameModal(true);
  };

  // Send Rename Request
  const handleConfirmRename = () => {
    if (!newChannelName.trim()) return;
    apiService.renameChannel(activeChat.id, newChannelName, userId)
      .then(updatedChannel => {
        alert(`Channel renamed to: ${updatedChannel.name}`);
        setShowRenameModal(false);
      })
      .catch(console.error);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{activeChat ? activeChat.name : "Select a chat"}</h2>
        {activeChat?.type === 'channel' && isAdmin && (
          <button className="rename-btn" onClick={handleRenameChannel}>
            Rename Channel
          </button>
        )}
      </div>

      <div className="messages">
        {messages.length > 0 ? (
          messages.map(msg => (
            <div key={msg.id} className="message">
              <strong>{msg.sender?.username || "Unknown"}:</strong> {msg.content}
            </div>
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>

      {activeChat && (
        <div className="message-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      )}

      {/* Rename Channel Modal */}
      {showRenameModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Rename Channel</h3>
            <input 
              type="text" 
              placeholder="Enter new channel name"
              value={newChannelName}
              onChange={(e) => setNewChannelName(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={handleConfirmRename}>Confirm</button>
              <button onClick={() => setShowRenameModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatWindow;
