import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import apiService from './services/apiService';
import { FaUser, FaPlus, FaUserPlus, FaSignOutAlt, FaEdit } from 'react-icons/fa';
import './ChatApp.css';

function ChatApp() {
  const [activeChat, setActiveChat] = useState(null);
  const [dashboard, setDashboard] = useState({ channels: [], friends: [] });
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Set during login

  useEffect(() => {
    if (userId) {
      apiService.getDashboard(userId)
        .then((data) => setDashboard(data))
        .catch((err) => console.error("Dashboard error:", err));
    }
  }, [userId]);

  // Dashboard button handlers using navigation
  const handleProfile = () => {
    navigate('/profile');
  };

  const handleAddFriend = () => {
    navigate('/add-friend');
  };

  const handleCreateChannel = () => {
    navigate('/create-channel');
  };

  // For adding a member, we navigate to a route that expects a channelId.
  // Here, for simplicity, we assume a channel must be selected.
  const handleAddMember = () => {
    if (activeChat && activeChat.type === 'channel') {
      navigate(`/add-member/${activeChat.id}`);
    } else {
      alert("Please select a channel first to add a member.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="chat-app-container">
      <header className="chat-header">
        <div className="logo">
          <FaEdit className="logo-icon" /> CRIM
        </div>
        <nav className="dashboard-nav">
          <button onClick={handleProfile}><FaUser /> Profile</button>
          <button onClick={handleAddFriend}><FaUserPlus /> Add Friend</button>
          <button onClick={handleCreateChannel}><FaPlus /> Create Channel</button>
          <button onClick={handleAddMember}><FaPlus /> Add Member</button>
          <button onClick={handleLogout}><FaSignOutAlt /> Logout</button>
        </nav>
      </header>
      <div className="chat-content">
        <Sidebar dashboard={dashboard} onSelectChat={setActiveChat} />
        <ChatWindow activeChat={activeChat} />
      </div>
    </div>
  );
}

export default ChatApp;
