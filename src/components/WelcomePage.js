import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../WelcomePage.css'; // If you prefer to keep these styles in a separate file

function WelcomePage() {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate('/login');
  };

  return (
    <div className="welcome-container">
      <h1 className="welcome-text">WELCOME TO THE CRIM</h1>
      <button className="continue-btn" onClick={handleContinue}>
        Enter
      </button>
      <div className="chat-animation">
        <div className="typewriter">
          <span>B1udger: Hi there...</span>
        </div>
      </div>
      <div className="footer">
        Created by Iliyan Stefanov 2401717008
      </div>
    </div>
  );
}

export default WelcomePage;
