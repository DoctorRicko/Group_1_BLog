import React, { useState } from 'react';
import axios from 'axios';
import { getToken } from '../authService';

function BlogPostForm() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();
      await axios.post('http://localhost:5000/api/posts', { title, content: body }, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setTitle('');
      setBody('');
      setError('');
    } catch (err) {
      setError('Failed to create blog post');
    }
  };

  return (
    <div>
      <h2>Create a Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}

export default BlogPostForm;