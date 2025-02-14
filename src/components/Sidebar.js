import React, { useEffect, useState } from 'react';
import apiService from '../services/apiService';

function Sidebar({ dashboard, onSelectChat }) {
  const [friendStatuses, setFriendStatuses] = useState({});

  useEffect(() => {
    if (dashboard.friends && dashboard.friends.length > 0) {
      const fetchStatuses = async () => {
        const statuses = {};
        for (const friend of dashboard.friends) {
          const isOnline = await apiService.getFriendStatus(friend.id);
          statuses[friend.id] = isOnline;
        }
        setFriendStatuses(statuses);
      };
      fetchStatuses();
    }
  }, [dashboard.friends]);

  return (
    <div className="sidebar">
      <h2>Channels</h2>
      <ul>
        {dashboard.channels && dashboard.channels.length > 0 ? (
          dashboard.channels.map(channel => (
            <li
              key={channel.id}
              onClick={() => onSelectChat({ type: 'channel', id: channel.id, name: channel.name })}
            >
              {channel.name}
            </li>
          ))
        ) : (
          <li>No channels available</li>
        )}
      </ul>

      <h2>Friends</h2>
      <ul>
        {dashboard.friends && dashboard.friends.length > 0 ? (
          dashboard.friends.map(friend => (
            <li key={friend.id} className="friend-item">
              <div
                className="friend-info"
                onClick={() => onSelectChat({ type: 'friend', id: friend.id, name: friend.username })}
              >
                <span className={`status-dot ${friendStatuses[friend.id] ? 'online' : 'offline'}`}></span>
                {friend.username}
              </div>

              <div className="friend-options">
                <button onClick={() => onSelectChat({ type: 'friend', id: friend.id, name: friend.username })}>
                  ✉ Send Message
                </button>
                <button onClick={() => console.log("View profile of", friend.username)}>
                  👤 View Profile
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No friends available</li>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;
