import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';

function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      apiService.getUserById(userId)
        .then(data => setProfile(data))
        .catch(err => console.error("Error fetching profile:", err));
    }
  }, [userId]);

  const handleBack = () => {
    navigate('/chat');
  };

  return (
    <div className="profile-page">
      <h1>Profile</h1>
      {profile ? (
        <div className="profile-details">
          <p><strong>ID:</strong> {profile.id}</p>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Role:</strong> {profile.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={handleBack}>Back to Chat</button>
    </div>
  );
}

export default ProfilePage;
