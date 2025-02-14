import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/apiService';
import './CreateChannel.css'; // Optional: create your own CSS for this page

function CreateChannel() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const ownerId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '') {
      setError("Channel name is required");
      return;
    }
    try {
      await apiService.createChannel(name, ownerId);
      navigate('/chat');
    } catch (err) {
      console.error("Error creating channel:", err);
      setError("Failed to create channel");
    }
  };

  return (
    <div className="create-channel-container">
      <h2>Create New Channel</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Channel Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          required 
        />
        <button type="submit">Create Channel</button>
      </form>
    </div>
  );
}

export default CreateChannel;
