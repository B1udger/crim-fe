import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddFriend from '../components/AddFriend';
import apiService from '../services/apiService';

function DashboardPage() {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [channelName, setChannelName] = useState('');
  const [newMemberId, setNewMemberId] = useState('');
  const [channelId, setChannelId] = useState('');

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Create a new channel
  const handleCreateChannel = async () => {
    if (!channelName.trim()) return alert("Channel name cannot be empty!");
    
    try {
      await apiService.createChannel(channelName, userId);
      alert(`Channel "${channelName}" created successfully!`);
      setChannelName('');
    } catch (err) {
      console.error("Error creating channel:", err);
      alert("Failed to create channel.");
    }
  };

  // Add a member to a channel
  const handleAddMember = async () => {
    if (!channelId || !newMemberId) return alert("Please enter channel ID and user ID!");

    try {
      await apiService.addMember(channelId, newMemberId, userId);
      alert("Member added successfully!");
      setNewMemberId('');
      setChannelId('');
    } catch (err) {
      console.error("Error adding member:", err);
      alert("Failed to add member.");
    }
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-buttons">
        <button onClick={handleProfile}>Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {/* Add Friend Component */}
      <h2>Add Friend</h2>
      <AddFriend />

      {/* Create Channel */}
      <h2>Create Channel</h2>
      <input 
        type="text" 
        placeholder="Enter channel name" 
        value={channelName}
        onChange={(e) => setChannelName(e.target.value)}
      />
      <button onClick={handleCreateChannel}>Create</button>

      {/* Add Member to Channel */}
      <h2>Add Member to Channel</h2>
      <input 
        type="text" 
        placeholder="Channel ID" 
        value={channelId}
        onChange={(e) => setChannelId(e.target.value)}
      />
      <input 
        type="text" 
        placeholder="User ID" 
        value={newMemberId}
        onChange={(e) => setNewMemberId(e.target.value)}
      />
      <button onClick={handleAddMember}>Add</button>
    </div>
  );
}

export default DashboardPage;
