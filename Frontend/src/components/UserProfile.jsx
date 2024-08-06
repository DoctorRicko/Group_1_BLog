import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <img src={user.profilePicture} alt="Profile" />
      <h3>{user.bio}</h3>
      <ul>
        {user.posts.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;