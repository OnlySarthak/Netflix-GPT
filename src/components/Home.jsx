import React from 'react'
import './css/home.css';
import Header from './Header';
import Login from './Login';
const Home = () => {
  return (
    <div className="home min-h-screen bg-cover bg-center">
  <Header />  {/* positioned absolute */}
  
  <div className="pt-9 flex justify-center items-start">
    <Login />
  </div>
</div>

  )
}

export default Home