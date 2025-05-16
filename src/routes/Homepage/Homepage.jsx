import './Homepage.css'
import { Link } from 'react-router-dom';

const Homepage = () => {
  return (
    <div className='Homepage'>
      <img src="/orbital.png" alt="" className='=orbital' />
      <div className="left">
        <h1>MATH AI</h1>
        <h2>Math Made Simple</h2>
        <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat sint
          dolorem doloribus, architecto dolor.
        </h3>
        <Link to="/dashboard">Get Started</Link>
      </div>
      <div className="right">

      </div>
    </div>
  )
}

export default Homepage