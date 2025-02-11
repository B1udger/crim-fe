import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';

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
    navigate('/dashboard');
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
      <button onClick={handleBack}>Back to Dashboard</button>
    </div>
  );
}

export default ProfilePage;
