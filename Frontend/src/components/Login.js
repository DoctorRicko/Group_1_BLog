import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../authService.js';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(username, password);
      navigate('/home');
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleSignupClick}>New User?</button>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Login;