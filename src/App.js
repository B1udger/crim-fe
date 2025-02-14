import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import Login from './components/Login';
import Register from './components/Register';
import ChatApp from './ChatApp';
import ProfilePage from './pages/ProfilePage';
import CreateChannel from './pages/CreateChannel';
import AddFriend from './pages/AddFriend';
import AddMember from './pages/AddMember';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatApp />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-channel" element={<CreateChannel />} />
        <Route path="/add-friend" element={<AddFriend />} />
        <Route path="/add-member/:channelId" element={<AddMember />} />
      </Routes>
    </Router>
  );
}

export default App;
