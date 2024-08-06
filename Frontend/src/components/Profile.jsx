import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found');
          setLoading(false);
          return;
        }

        const userResponse = await axios.get('http://localhost:5000/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(userResponse.data);

        const blogPostsResponse = await axios.get('http://localhost:5000/api/posts', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setBlogPosts(blogPostsResponse.data);
      } catch (err) {
        console.error('Error fetching user data or blog posts:', err);
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Your Profile</h2>
      {error && <p>{error}</p>}
      {user && (
        <div>
          <h3>User Details</h3>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Bio:</strong> {user.bio}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Gender:</strong> {user.gender}</p>
        </div>
      )}
      <h3>Your Blog Posts</h3>
      {blogPosts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        <ul>
          {blogPosts.map((post) => (
            <li key={post._id}>
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profile;