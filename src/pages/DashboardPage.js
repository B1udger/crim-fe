// DashboardPage.js
import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import { useNavigate } from 'react-router-dom';

function DashboardPage() {
  const [dashboard, setDashboard] = useState({ channels: [], friends: [] });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  // Fetch dashboard data on mount (channels and friends)
  useEffect(() => {
    if (userId) {
      apiService.getDashboard(userId)
        .then((data) => setDashboard(data))
        .catch((err) => console.error("Error fetching dashboard", err));
    }
  }, [userId]);

  // Handle search input change to search for users
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.length > 1) {
      apiService.searchUsers(term)
        .then((users) => setSearchResults(users))
        .catch((err) => console.error("Error searching users", err));
    } else {
      setSearchResults([]);
    }
  };

  // Add a friend using the addFriend API endpoint
  const handleAddFriend = (friendId) => {
    apiService.addFriend(userId, friendId)
      .then(() => {
        alert("Friend added!");
        // Optionally refresh the dashboard data after adding a friend
        apiService.getDashboard(userId)
          .then((data) => setDashboard(data))
          .catch((err) => console.error("Error updating dashboard", err));
      })
      .catch((err) => console.error("Error adding friend", err));
  };

  // Navigate to a channel chat page (if needed)
  const handleChannelClick = (channel) => {
    // You can navigate to the chat page for the channel or open a modal, etc.
    navigate('/chat', { state: { activeChat: channel } });
  };

  return (
    <div className="dashboard-page">
      <h1>Dashboard</h1>
      
      <section className="dashboard-section">
        <h2>Your Channels</h2>
        {dashboard.channels.length > 0 ? (
          <ul>
            {dashboard.channels.map((channel) => (
              <li key={channel.id} onClick={() => handleChannelClick(channel)}>
                {channel.name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No channels available.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2>Your Friends</h2>
        {dashboard.friends.length > 0 ? (
          <ul>
            {dashboard.friends.map((friend) => (
              <li key={friend.id}>{friend.username}</li>
            ))}
          </ul>
        ) : (
          <p>You have no friends added.</p>
        )}
      </section>

      <section className="search-section">
        <h2>Search Users</h2>
        <input 
          type="text"
          placeholder="Search for users..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        {searchResults.length > 0 && (
          <ul>
            {searchResults.map((user) => (
              <li key={user.id}>
                {user.username} 
                <button onClick={() => handleAddFriend(user.id)}>Add Friend</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default DashboardPage;
