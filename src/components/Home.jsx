import React from 'react'
import './css/home.css';
import Header from './Header';
import Login from './Login';
const Home = () => {
  return (
    <div className='home'>
        <Header/>
        <Login />
    </div>
  )
}

export default Home