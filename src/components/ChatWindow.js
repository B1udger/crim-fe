// ChatWindow.js
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import '../ChatApp.css';

function ChatWindow({ activeChat, onSelectChat }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [newChannelName, setNewChannelName] = useState('');
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [hoveredMessage, setHoveredMessage] = useState(null);
  const userId = localStorage.getItem('userId');
  
  // Check if the user is an admin (as stored during login)
  const isAdmin = localStorage.getItem('isAdmin') === "true";
  
  // Check if the current user is the owner of the channel.
  // This check assumes the activeChat object includes an "owner" object with an "id" property.
  const isOwner = activeChat?.owner?.id?.toString() === userId?.toString();

  // Fetch messages when activeChat changes
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

  // Function to send a message
  const sendMessage = () => {
    if (!input.trim()) return;

    const sendFunction = activeChat.type === 'channel'
      ? apiService.sendChannelMessage(userId, activeChat.id, input)
      : apiService.sendPrivateMessage(userId, activeChat.id, input);

    sendFunction
      .then(msg => setMessages(prev => [...prev, msg]))
      .catch(console.error);
    setInput('');
  };

  // Rename Channel Functionality
  const handleRenameChannel = () => {
    setShowRenameModal(true);
  };

  const handleConfirmRename = () => {
    if (!newChannelName.trim()) return;
    apiService.renameChannel(activeChat.id, newChannelName, userId)
      .then(updatedChannel => {
        alert(`Channel renamed to: ${updatedChannel.name}`);
        setShowRenameModal(false);
      })
      .catch(console.error);
  };

  // Delete Channel Functionality
  const handleDeleteChannel = () => {
    if (!activeChat?.id) return;
    apiService.deleteChannel(activeChat.id, userId)
      .then(() => {
        alert("Channel deleted!");
        // Additional logic to update the channel list or navigate can be added here
      })
      .catch(err => {
        console.error("Error deleting channel:", err);
        alert("Failed to delete channel.");
      });
  };

  // Set Admin Functionality remains the same
  const handleSetAdmin = (memberId) => {
    apiService.setAdmin(activeChat.id, memberId, userId)
      .then(() => alert("User granted admin role!"))
      .catch(console.error);
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <h2>{activeChat ? activeChat.name : "Select a chat"}</h2>
        {activeChat?.type === 'channel' && (isAdmin || isOwner) && (
          <>
            <button className="rename-btn" onClick={handleRenameChannel}>
              Rename Channel
            </button>
            <button className="delete-btn" onClick={handleDeleteChannel}>
              Delete Channel
            </button>
          </>
        )}
      </div>

      <div className="messages">
        {messages.length > 0 ? (
          messages.map(msg => (
            <div 
              key={msg.id} 
              className="message"
              onMouseEnter={() => setHoveredMessage(msg.id)}
              onMouseLeave={() => setHoveredMessage(null)}
            >
              <strong className="message-sender">
                {msg.sender?.username || "Unknown"}:
              </strong> {msg.content}
              {hoveredMessage === msg.id && msg.sender?.id !== userId && (
                <div className="message-options">
                  <button onClick={() => console.log("Viewing profile of", msg.sender.username)}>
                    👤 View Profile
                  </button>
                  {activeChat.type === 'channel' && (
                    <button onClick={() => handleSetAdmin(msg.sender.id)}>
                      🔧 Make Admin
                    </button>
                  )}
                  <button onClick={() => onSelectChat({ type: 'friend', id: msg.sender.id, name: msg.sender.username })}>
                    ✉ Send Message
                  </button>
                </div>
              )}
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
