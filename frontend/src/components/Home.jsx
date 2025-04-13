import React from 'react'
import Nav from './Nav'

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/bg.jpeg")',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <Nav />
    </div>
  )
}

export default Home
