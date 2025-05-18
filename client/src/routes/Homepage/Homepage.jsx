import './Homepage.css'
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Homepage = () => {
  const { getToken } = useAuth();
  // const test = async () => {
  //   const token = await getToken();
  //   await fetch("http://localhost:3000/api/test", {
  //     headers: {
  //         Authorization: `Bearer ${token}`, // Include Bearer token
  //       },
  //     credentials: "include",
  //   });
  // }
  return (
    <div className='Homepage'>
      <img src="/orbital.png" alt="" className='orbital' />
      <div className="left">
        <h1>YOUR AI</h1>
        <h2>A Friendly Companion</h2>
        <h3>Presented by Lê Văn Thức.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">

      </div>
    </div>
  )
}

export default Homepage