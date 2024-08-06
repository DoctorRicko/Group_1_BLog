import express from 'express';
import BlogPost from '../models/BlogPost.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, async (req, res) => {
  const { title, content } = req.body;
  try {
    const newPost = new BlogPost({ title, content, author: req.user._id });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error creating post', error });
  }
});

router.get('/', authMiddleware, async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
});

router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const blogPost = await BlogPost.findOneAndUpdate(
      { _id: req.params.id, author: req.user._id },
      req.body,
      { new: true }
    );
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found or unauthorized' });
    }
    res.json(blogPost);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update blog post' });
  }
});

router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const blogPost = await BlogPost.findOneAndDelete({ _id: req.params.id, author: req.user._id });
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found or unauthorized' });
    }
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete blog post' });
  }
});

export default router;