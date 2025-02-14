import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './AddFriend.css'; // Optional: create your own CSS for this page

function AddFriend() {
  const [friendIdentifier, setFriendIdentifier] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (friendIdentifier.trim() === '') {
      setError("Friend identifier is required");
      return;
    }
    try {
      await apiService.addFriend(userId, friendIdentifier);
      navigate('/chat');
    } catch (err) {
      console.error("Error adding friend:", err);
      setError("Failed to add friend");
    }
  };

  return (
    <div className="add-friend-container">
      <h2>Add Friend</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Friend ID or Username" 
          value={friendIdentifier}
          onChange={(e) => setFriendIdentifier(e.target.value)}
          required 
        />
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}

export default AddFriend;
