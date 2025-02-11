// src/components/DashboardPanel.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPanel() {
  const navigate = useNavigate();

  // Navigate to the create channel page (or handle as needed)
  const handleCreateChannel = () => {
    console.log("Create New Channel clicked");
    navigate('/create-channel'); // Replace with your route or modal logic
  };

  // Navigate to the add friend page (or handle as needed)
  const handleAddFriend = () => {
    console.log("Add Friend clicked");
    navigate('/add-friend'); // Replace with your route or modal logic
  };

  // Navigate to the profile page (or handle as needed)
  const handleProfile = () => {
    console.log("Profile clicked");
    navigate('/profile'); // Replace with your route or modal logic
  };

  return (
    <div className="dashboard-panel">
      <button className="dashboard-btn" onClick={handleCreateChannel}>
        Create New Channel
      </button>
      <button className="dashboard-btn" onClick={handleAddFriend}>
        Add Friend
      </button>
      <button className="dashboard-btn" onClick={handleProfile}>
        Profile
      </button>
    </div>
  );
}

export default DashboardPanel;
