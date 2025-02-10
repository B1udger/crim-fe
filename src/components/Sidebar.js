import React from 'react';

function Sidebar({ dashboard, onSelectChat }) {
  return (
    <div className="sidebar">
      <h2>Channels</h2>
      <ul>
        {dashboard.channels.map(channel => (
          <li
            key={channel.id}
            onClick={() => {
              console.log("Selected channel:", channel);
              onSelectChat({ type: 'channel', id: channel.id, name: channel.name });
            }}
          >
            {channel.name}
          </li>
        ))}
      </ul>
      <h2>Friends</h2>
      <ul>
        {dashboard.friends.map(friend => (
          <li
            key={friend.id}
            onClick={() => {
              console.log("Selected friend:", friend);
              onSelectChat({ type: 'friend', id: friend.id, name: friend.username });
            }}
          >
            {friend.username}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
