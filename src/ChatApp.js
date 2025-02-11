// src/ChatApp.js
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import DashboardPanel from './components/DashboardPanel';
import apiService from './services/apiService';

function ChatApp() {
  const [activeChat, setActiveChat] = useState(null);
  const [dashboard, setDashboard] = useState({ channels: [], friends: [] });

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assume userId is saved during login
    if (userId) {
      apiService.getDashboard(userId)
        .then(data => setDashboard(data))
        .catch(err => console.error("Dashboard error:", err));
    }
  }, []);

  return (
    <div className="app-container">
      <Sidebar dashboard={dashboard} onSelectChat={setActiveChat} />
      <div className="chat-content">
        <DashboardPanel />
        <ChatWindow activeChat={activeChat} />
      </div>
    </div>
  );
}

export default ChatApp;
