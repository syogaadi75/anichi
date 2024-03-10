import React, { useEffect } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'
import FullLoading from '../components/Loading'

function Home() {
  return (
    <div className="w-full min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
      <FullLoading />
      <Navbar />
      <Recent />
    </div>
  )
}

export default Home
