import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/posts')
      .then(response => setPosts(response.data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  const handlePostSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');
    
      const response = await axios.post(
        'http://localhost:5000/api/posts',
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      setPosts([...posts, response.data]);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating post:', error.response ? error.response.data : error.message);
    }
  };  

  return (
    <div>
      <h2>Welcome to the Blog</h2>
      <form onSubmit={handlePostSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map(post => (
          <div key={post._id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;