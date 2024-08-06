import React from 'react';

const BlogPost = ({ post }) => {
  if (!post) return <p>Loading...</p>;

  return (
    <div className="blog-post">
      <h1>{post.title}</h1>
      <p><strong>Author:</strong> {post.author.username}</p>
      <p>{post.content}</p>
    </div>
  );
};

export default BlogPost;