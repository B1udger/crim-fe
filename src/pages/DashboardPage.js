import React from 'react';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const navigate = useNavigate();

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleAddFriend = () => {
    alert("Add Friend functionality invoked");
  };

  const handleCreateChannel = () => {
    alert("Create Channel functionality invoked");
  };

  const handleAddMember = () => {
    alert("Add Member functionality invoked");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      <div className="dashboard-buttons">
        <button onClick={handleProfile}>Profile</button>
        <button onClick={handleAddFriend}>Add Friend</button>
        <button onClick={handleCreateChannel}>Create Channel</button>
        <button onClick={handleAddMember}>Add Member</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}

export default DashboardPage;
