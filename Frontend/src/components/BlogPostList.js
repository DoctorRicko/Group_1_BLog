import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogPostsList() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/blogposts');
        setBlogPosts(response.data);
      } catch (err) {
        setError('Failed to fetch blog posts');
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <div>
      <h2>Blog Posts</h2>
      {error && <p>{error}</p>}
      <ul>
        {blogPosts.map((post) => (
          <li key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>By: {post.author.username}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogPostsList;
