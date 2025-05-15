import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './routes/homepage/Homepage.jsx';
import Dashboardpage from './routes/dashboardpage/Dashboardpage.jsx';
import Chatpage from './routes/chatpage/Chatpage.jsx';
import Rootlayout from './layouts/Rootlayout/Rootlayout.jsx';
import Dashboardlayout from './layouts/Dashboardlayout/Dashboardlayout.jsx';
const router = createBrowserRouter([
    {
      element: <Rootlayout/>,
      children: [
        {
          path: '/',
          element: <Homepage/>,
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
