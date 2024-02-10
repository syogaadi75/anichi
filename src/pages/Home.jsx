import React, { useEffect } from 'react'
import gsap from 'gsap'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'

function Home() {
  return (
    <div className="w-full min-h-screen bg-light">
      <Loading />
      <Navbar />
      <Recent />
      <Recent />
    </div>
  )
}

export default Home
