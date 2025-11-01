import React from 'react'
import Browse from './Browse.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path : "/",
            element : <Home/>
        },{
            path : "/browse",
            element : <Browse/>
        },{
            path : "/login",
            element : <Login/>
        }
    ])
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body