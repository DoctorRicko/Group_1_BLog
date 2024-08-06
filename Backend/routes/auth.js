import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password, bio, age, gender } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      bio,
      age,
      gender,
    });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid username or password' });
    }

    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ error: 'Error logging in user' });
  }
});

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('username bio age gender');
    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch user profile' });
  }
});

export default router;
