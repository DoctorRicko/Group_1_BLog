import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import blogPostRoutes from './routes/blogPosts.js';
import profileRoutes from './routes/profile.js';

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://admin-Richard:test123@blogpost.o8hg25r.mongodb.net/?retryWrites=true&w=majority&appName=BlogPost' || 'mongodb://localhost:27017/blogpost', {
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch((error) => {
        console.error('Database connection error:', error);
});

app.use(cors());
app.use(express.json());
app.use('/api/posts', blogPostRoutes);
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

app.use((err, req, res, next) => {
    console.error('Internal Server Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
