import React from 'react';
import { useNavigate } from 'react-router-dom';

function About() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
      navigate('/login');
    };
  
  return (
    <div>
      <h2>About Richard and Thomas' website</h2>
      <p>Welcome to the Blog App! Here, you would ideally read and write blog posts, view your profile, and more. However, we really didn't have time to write this until today and I don't care anymore at this point, nothing is making this thing work</p>
      <button onClick={handleLoginClick}>Login</button>
    </div>
  );
}

export default About;