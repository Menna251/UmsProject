import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './Components/AuthLayout/AuthLayout'
import Login from './Components/Login/Login'
import NotFound from './Components/NotFound/NotFound'
import MasterLayout from './Components/MasterLayout/MasterLayout'
import Home from './Components/Home/Home'
import UserData from './Components/UserData/UserData'
import UsersList from './Components/UsersList/UsersList'
import Profile from './Components/Profile/Profile'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function App() {

  const routes = createBrowserRouter([
    {
      path:'',
      element:<AuthLayout />,
      errorElement:<NotFound />,
      children:[
        {index:true,element:<Login />},
        {path:'login',element:<Login />}
      ]
    },
    {
      path:"dashboard",
      element:<MasterLayout />,
      errorElement:<NotFound />,
      children:[
        {index:true,element:<Home />},
        {path:'home',element:<Home />},
        {path:'UserData/:userId?',element:<UserData/>},
        {path:'users',element:<UsersList />},
        {path:'profile',element:<Profile />}
      ]
    }
  ])

  return (
    <>
    <ToastContainer />
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
