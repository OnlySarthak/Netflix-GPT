import React from 'react'
import { logo } from '../utils/constant'

const Header = () => {
  return (
    <div className= 'absolute h-22 px-32 flex items-center justify-left bg-gradient-to-b from-black'>
        <img 
        className='h-20'
        src={logo}
        alt="netflix-logo"/>
        <div>

        </div>
    </div>
  )
}

export default Header