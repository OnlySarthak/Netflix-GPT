import React from "react";
import './css/home.css';
import Header from './Header';
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div className="home min-h-screen bg-cover bg-center">

      <Header />

      <div className="flex justify-center items-start">
        <Outlet />  {/* Dynamic blocks show here */}
      </div>

    </div>
  );
};

export default Home;
