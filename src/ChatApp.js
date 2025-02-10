import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import apiService from './services/apiService';

function ChatApp() {
  const [activeChat, setActiveChat] = useState(null);
  const [dashboard, setDashboard] = useState({ channels: [], friends: [] });

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // saved during login
    if (userId) {
      apiService.getDashboard(userId)
        .then(data => setDashboard(data))
        .catch(err => console.error("Dashboard error:", err));
    }
  }, []);

  return (
    <div className="app-container">
      <Sidebar dashboard={dashboard} onSelectChat={setActiveChat} />
      <ChatWindow activeChat={activeChat} />
    </div>
  );
}

export default ChatApp;
