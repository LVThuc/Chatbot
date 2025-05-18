import { use } from 'react';
import './Dashboardpage.css'
import {useAuth} from "@clerk/clerk-react"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom';
const Dashboardpage = () => {

  const navigate = useNavigate();
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: async (text) => {
    const token = await getToken();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ text }),
    });
    const data = await res.json();
    return data.id; // Use the id property
  },
  onSuccess: (id) => {
    queryClient.invalidateQueries({ queryKey: ['userChats'] });
    navigate(`/dashboard/chats/${id}`);
  }
});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target.text.value;
    if (!text) return;

    mutation.mutate(text);
  };

  return (
    <div className='Dashboardpage'>
      <div className="texts">
        <div className="logo">
          <img src="/logo.png" alt="" />
          <h1>MATH AI</h1>
        </div>
        <div className="options">
          <div className="option">
            <img src="/chat.png" alt="" />
            <span>Create A New Chat</span>
          </div>
          <div className="option">
            <img src="/image.png" alt="" />
            <span>Analyze Images</span>
          </div>
          <div className="option">
            <img src="/code.png" alt="" />
            <span>Solve Math Problem</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder='Ask me anything' />
          <button>
            <img src="/arrow.png" alt="" />
            <span></span>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Dashboardpage