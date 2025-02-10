import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || '';

const apiService = {
  // Auth endpoints
  registerUser: (userData) => {
    return axios.post(`${API_BASE}/api/auth/register`, userData).then(res => res.data);
  },
  loginUser: (username, password) => {
    return axios.post(`${API_BASE}/api/auth/login`, null, { params: { username, password } }).then(res => res.data);
  },
  // User endpoints
  getDashboard: (userId) => {
    return axios.get(`${API_BASE}/api/users/${userId}/dashboard`).then(res => res.data);
  },
  searchUsers: (keyword) => {
    return axios.get(`${API_BASE}/api/users`, { params: { search: keyword } }).then(res => res.data);
  },
  addFriend: (userId, friendId) => {
    return axios.post(`${API_BASE}/api/users/${userId}/friends/${friendId}`).then(res => res.data);
  },
  getAllUsers: () => {
    return axios.get(`${API_BASE}/api/users/all`).then(res => res.data);
  },
  // Channel endpoints
  createChannel: (name, ownerId) => {
    return axios.post(`${API_BASE}/api/channels`, null, { params: { name, ownerId } }).then(res => res.data);
  },
  updateChannelName: (channelId, newName, requesterId) => {
    return axios.put(`${API_BASE}/api/channels/${channelId}`, null, { params: { newName, requesterId } }).then(res => res.data);
  },
  deleteChannel: (channelId, requesterId) => {
    return axios.delete(`${API_BASE}/api/channels/${channelId}`, { params: { requesterId } }).then(res => res.data);
  },
  addMember: (channelId, memberId, requesterId) => {
    return axios.post(`${API_BASE}/api/channels/${channelId}/members/${memberId}`, null, { params: { requesterId } }).then(res => res.data);
  },
  removeMember: (channelId, memberId, requesterId) => {
    return axios.delete(`${API_BASE}/api/channels/${channelId}/members/${memberId}`, { params: { requesterId } }).then(res => res.data);
  },
  setAdmin: (channelId, memberId, requesterId) => {
    return axios.put(`${API_BASE}/api/channels/${channelId}/members/${memberId}/role`, null, { params: { requesterId } }).then(res => res.data);
  },
  getAllChannels: () => {
    return axios.get(`${API_BASE}/api/channels`).then(res => res.data);
  },
  getChannelsByMember: (userId) => {
    return axios.get(`${API_BASE}/api/channels/member/${userId}`).then(res => res.data);
  },
  // Message endpoints
  sendPrivateMessage: (senderId, recipientId, content) => {
    return axios.post(`${API_BASE}/api/messages/private`, null, { params: { senderId, recipientId, content } }).then(res => res.data);
  },
  sendChannelMessage: (senderId, channelId, content) => {
    return axios.post(`${API_BASE}/api/messages/channel`, null, { params: { senderId, channelId, content } }).then(res => res.data);
  },
  getChannelMessages: (channelId) => {
    return axios.get(`${API_BASE}/api/messages/channel/${channelId}`).then(res => res.data);
  },
  getPrivateMessages: (user1Id, user2Id) => {
    return axios.get(`${API_BASE}/api/messages/private`, { params: { user1Id, user2Id } }).then(res => res.data);
  }
};

export default apiService;
