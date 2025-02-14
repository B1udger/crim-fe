import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || '';

const apiService = {
  // Authentication
  registerUser: (userData) => 
    axios.post(`${API_BASE}/api/auth/register`, userData).then(res => res.data),

  loginUser: (username, password) => 
    axios.post(`${API_BASE}/api/auth/login`, null, { params: { username, password } }).then(res => res.data),

  // Users
  getDashboard: (userId) => 
    axios.get(`${API_BASE}/api/users/${userId}/dashboard`).then(res => res.data),

  searchUsers: (keyword) => 
    axios.get(`${API_BASE}/api/users/search`, { params: { search: keyword } }).then(res => res.data),

  addFriendRequest: (userId, friendId) => 
    axios.post(`${API_BASE}/api/users/${userId}/friend-request/${friendId}`).then(res => res.data),

  getFriendRequests: (userId) => 
    axios.get(`${API_BASE}/api/users/${userId}/friend-requests`).then(res => res.data),

  respondToFriendRequest: (userId, friendId, accept) => 
    axios.post(`${API_BASE}/api/users/${userId}/respond-friend-request/${friendId}`, { accept }).then(res => res.data),

  getAllUsers: () => 
    axios.get(`${API_BASE}/api/users/all`).then(res => res.data),

  getUserById: (userId) => 
    axios.get(`${API_BASE}/api/users/${userId}`).then(res => res.data),

  // Friends
  getFriends: (userId) => 
    axios.get(`${API_BASE}/api/users/${userId}/friends`).then(res => res.data),

  getFriendStatus: (friendId) => 
    axios.get(`${API_BASE}/api/users/friend-status/${friendId}`).then(res => res.data),

  // Channels
  createChannel: (name, ownerId) => 
    axios.post(`${API_BASE}/api/channels`, null, { params: { name, ownerId } }).then(res => res.data),

  updateChannelName: (channelId, newName, requesterId) => 
    axios.put(`${API_BASE}/api/channels/${channelId}`, null, { params: { newName, requesterId } }).then(res => res.data),

  deleteChannel: (channelId, requesterId) => 
    axios.delete(`${API_BASE}/api/channels/${channelId}`, { params: { requesterId } }).then(res => res.data),

  addMember: (channelId, memberId, requesterId) => 
    axios.post(`${API_BASE}/api/channels/${channelId}/members/${memberId}`, null, { params: { requesterId } }).then(res => res.data),

  removeMember: (channelId, memberId, requesterId) => 
    axios.delete(`${API_BASE}/api/channels/${channelId}/members/${memberId}`, { params: { requesterId } }).then(res => res.data),

  setAdmin: (channelId, memberId, requesterId) => 
    axios.put(`${API_BASE}/api/channels/${channelId}/members/${memberId}/role`, null, { params: { requesterId } }).then(res => res.data),

  getAllChannels: () => 
    axios.get(`${API_BASE}/api/channels`).then(res => res.data),

  getChannelsByMember: (userId) => 
    axios.get(`${API_BASE}/api/channels/member/${userId}`).then(res => res.data),

  renameChannel: (channelId, newName, requesterId) => 
    axios.put(`/api/channels/${channelId}/rename`, null, { params: { newName, requesterId } }).then(res => res.data),

  

  // Messages
  sendPrivateMessage: (senderId, recipientId, content) => 
    axios.post(`${API_BASE}/api/messages/private`, null, { params: { senderId, recipientId, content } }).then(res => res.data),

  sendChannelMessage: (senderId, channelId, content) => 
    axios.post(`${API_BASE}/api/messages/channel`, null, { params: { senderId, channelId, content } }).then(res => res.data),

  getChannelMessages: (channelId) => 
    axios.get(`${API_BASE}/api/messages/channel/${channelId}`).then(res => res.data),

  getPrivateMessages: (user1Id, user2Id) => 
    axios.get(`${API_BASE}/api/messages/private`, { params: { user1Id, user2Id } }).then(res => res.data)
};

export default apiService;
