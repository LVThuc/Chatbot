import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/Homepage/Homepage.jsx';
import Dashboardpage from './routes/Dashboardpage/Dashboardpage.jsx';
import Chatpage from './routes/chatpage/Chatpage.jsx';
import Rootlayout from './layouts/Rootlayout/Rootlayout.jsx';
import Dashboardlayout from './layouts/Dashboardlayout/Dashboardlayout.jsx';
import Signinpage from './routes/Signinpage/Signinpage.jsx';
import SignUpPage from './routes/Signuppage/Signuppage.jsx';


const router = createBrowserRouter([
    {
      
      element: <Rootlayout/>,
      children: [
        {
          path: '/',
          element: <Homepage/>,
        },
        {
          path: '/sign-in/',
          element: <Signinpage/>,
        },
        {
          path: 'sign-up',
          element: <SignUpPage/>,
        },
        {
          element: <Dashboardlayout/>,
          children: [
            {
              path:"/dashboard",
              element: <Dashboardpage/>,
            },
            {
              path:"/dashboard/chats/:id",
              element: <Chatpage/>,
            }
          ]
        }
      ],
    }
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router ={router} /> 
  </React.StrictMode>,
)
