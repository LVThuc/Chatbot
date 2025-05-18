import './Homepage.css';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Homepage = () => {
  const { getToken } = useAuth();

  const test = async () => {

      const token = await getToken(); // Fetch Clerk session token
      const response = await fetch('http://localhost:3000/api/test', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Include Bearer token
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Keep for cookies if needed
      });
  };

  return (
    <div className="Homepage">
      <img src="/orbital.png" alt="" className="orbital" />
      <div className="left">
        <h1>MATH AI</h1>
        <h2>Math Made Simple</h2>
        <h3>Presented by Lê Văn Thức.</h3>
        <Link to="/dashboard">Get Started</Link>
        <button onClick={test}>TEST BACKEND AUTH</button>
      </div>
      <div className="right"></div>
    </div>
  );
};

export default Homepage;