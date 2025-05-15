import './dashboardlayout.css'
import { Outlet } from 'react-router-dom';
const Dashboardlayout = () => {
  return (
    <div className='dashboardlayout'>
    <div className='menu'> MENU </div>
    <div className='content'> 
        <Outlet/>
    </div>
    </div>
  )
}

export default Dashboardlayout