import React, { useState } from 'react';
import apiService from '../services/apiService';

function AddFriend({ onFriendAdded }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState('');

  const userId = localStorage.getItem('userId');

  // Search for users in the database
  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 1) {
      try {
        const users = await apiService.searchUsers(value);
        setSuggestions(users);
      } catch (err) {
        console.error("Error searching users:", err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  // Add friend when clicking a suggestion
  const handleAddFriend = async (friendId) => {
    try {
      await apiService.addFriend(userId, friendId);
      setSearchTerm('');
      setSuggestions([]);
      setError('');
      onFriendAdded(); // Refresh UI
      alert("Friend added successfully!");
    } catch (err) {
      console.error("Error adding friend:", err);
      setError("Failed to add friend. Please try again.");
    }
  };

  return (
    <div className="add-friend-container">
      <input
        type="text"
        placeholder="Search for users..."
        value={searchTerm}
        onChange={handleSearch}
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map(user => (
            <li key={user.id} onClick={() => handleAddFriend(user.id)}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default AddFriend;
