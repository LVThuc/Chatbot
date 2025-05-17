import './chatlist.css'
import { Link } from 'react-router-dom';
const Chatlist = () => {
    return (
        <div className='chatlist'>
            <span className='title'>DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/">Explore Math AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className='title'>RECENT CHATS</span>
            <div className="list">
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
                <Link to="/"> My Chat Title</Link>
            </div>
            <hr />
            <div className="Feedback">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span> Give Me A Positive Feedback For </span>
                    <span> IT003 ASSIGNMENT</span>
                </div>
            </div>
        </div>
    )
}

export default Chatlist