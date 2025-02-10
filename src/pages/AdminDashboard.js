import React, { useState, useEffect } from 'react';
import apiService from '../services/apiService';

function AdminDashboard() {
  // State for users and channels
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);

  // Fetch users and channels on mount
  useEffect(() => {
    fetchUsers();
    fetchChannels();
  }, []);

  const fetchUsers = () => {
    apiService.getAllUsers()
      .then(data => setUsers(data))
      .catch(err => console.error("Error fetching users:", err));
  };

  const fetchChannels = () => {
    apiService.getAllChannels()
      .then(data => setChannels(data))
      .catch(err => console.error("Error fetching channels:", err));
  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-controls">
        <button onClick={fetchUsers}>Refresh Users</button>
        <button onClick={fetchChannels}>Refresh Channels</button>
      </div>
      <section className="admin-section">
        <h2>All Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="4">No users found.</td>
              </tr>
            ) : (
              users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
      <section className="admin-section">
        <h2>All Channels</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {channels.length === 0 ? (
              <tr>
                <td colSpan="4">No channels found.</td>
              </tr>
            ) : (
              channels.map(channel => (
                <tr key={channel.id}>
                  <td>{channel.id}</td>
                  <td>{channel.name}</td>
                  <td>{channel.owner ? channel.owner.username : 'N/A'}</td>
                  <td>{channel.deleted ? 'Deleted' : 'Active'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default AdminDashboard;
