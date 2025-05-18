import './chatlist.css'
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import { useAuth } from "@clerk/clerk-react";

const Chatlist = () => {
    const { getToken } = useAuth();

    const { isPending, error, data } = useQuery({
        queryKey: ['userChats'],
        queryFn: async () => {
            const token = await getToken();
            return fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((res) => res.json());
        },
    });

    

    return (
        <div className='chatlist'>
            <span className='title'>DASHBOARD</span>
            <Link to="/dashboard">Create a new Chat</Link>
            <Link to="/dashboard">Explore Your AI</Link>
            <Link to="/">Contact</Link>
            <hr />
            <span className='title'>RECENT CHATS</span>
            <div className="list">
                {isPending ? "Loading..." : error ? "Error" : data?.map(chat => (
                    <Link to={`/dashboard/chats/${chat._id}`} key={chat._id}> {chat.title} </Link>
                ))}
            </div>
            <hr />
            <div className="Feedback">
                <img src="/logo.png" alt="" />
                <div className="texts">
                    <span> Give Me A Positive Feedback For </span>
                    <span> IT003 ASSIGNMENT</span>
                    <span> Contact me through: 24521748@gm.uit.edu.vn or 0972908249</span>
                </div>
            </div>
        </div>
    )
}

export default Chatlist