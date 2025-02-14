import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SenderOptions({ user }) {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile?userId=${user.id}`);
  };

  const handleGiveAdmin = () => {
    // Replace this alert with your API call to assign admin role if needed
    alert(`Give admin role to ${user.username}`);
  };

  return (
    <div
      className="sender-options-container"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      style={{ display: 'inline-block', position: 'relative' }}
    >
      <span>{user.username}</span>
      {visible && (
        <div
          className="sender-options-dropdown"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            background: '#2c2f33',
            border: '1px solid #444',
            borderRadius: '4px',
            padding: '5px',
            zIndex: 100,
          }}
        >
          <button
            onClick={handleViewProfile}
            style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', color: '#fff', textAlign: 'left', padding: '5px 0' }}
          >
            View Profile
          </button>
          <button
            onClick={handleGiveAdmin}
            style={{ display: 'block', width: '100%', background: 'transparent', border: 'none', color: '#fff', textAlign: 'left', padding: '5px 0' }}
          >
            Give Admin
          </button>
        </div>
      )}
    </div>
  );
}

export default SenderOptions;
