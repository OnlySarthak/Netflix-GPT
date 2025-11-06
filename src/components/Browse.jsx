import React from 'react'
import HeaderBrowser from './HeaderBrowser'

const Browse = () => {
  return (
    <div>
      <HeaderBrowser/>
      <div className='text-white mt-20 p-8'>
        <h1 className='text-3xl font-bold mb-4'>Browse Page</h1>
        <p>Welcome to the Browse page! Here you can explore various movies and TV shows.</p>
      </div>

    </div>
  )
}

export default Browse