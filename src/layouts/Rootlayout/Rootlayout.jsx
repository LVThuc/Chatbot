import { Link, Outlet } from 'react-router-dom';
import './Rootlayout.css'

const Rootlayout = () => {
  return (
    <div className='Rootlayout'>
     <header>       
        <Link to="/" className="logo">
  <img src="/logo.png" alt="" />
  <span>MATH AI</span>
</Link>
        <div className="user">User </div>
     </header>
     <main>
      <Outlet/> 
     </main>
    </div>
  )
}

export default Rootlayout