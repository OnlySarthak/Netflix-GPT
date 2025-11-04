import React from 'react'
import Browse from './Browse.jsx'
import Login from './Login.jsx'
import Home from './Home.jsx'
import VerificationSent from "./auth/VerificationSent.jsx";
import EmailVerified from "./auth/EmailVerified.jsx";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const Body = () => {

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      children: [
        { index: true, element: <Login /> },   // default inside Home
        { path: "verify-sent", element: <VerificationSent /> },
        { path: "verified", element: <EmailVerified /> },
      ]
    },
    {
      path: "/browse",
      element: <Browse />
    }
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
