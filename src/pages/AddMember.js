import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiService from '../services/apiService';
import './AddMember.css'; // Optional: create your own CSS for this page

function AddMember() {
  const { channelId } = useParams();
  const [memberId, setMemberId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const requesterId = localStorage.getItem('userId');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (memberId.trim() === '') {
      setError("Member ID is required");
      return;
    }
    try {
      await apiService.addMember(channelId, memberId, requesterId);
      navigate('/chat');
    } catch (err) {
      console.error("Error adding member:", err);
      setError("Failed to add member");
    }
  };

  return (
    <div className="add-member-container">
      <h2>Add Member to Channel {channelId}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Member ID" 
          value={memberId}
          onChange={(e) => setMemberId(e.target.value)}
          required 
        />
        <button type="submit">Add Member</button>
      </form>
    </div>
  );
}

export default AddMember;
