import React, { useEffect } from 'react'
import gsap from 'gsap'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'
import DetailPage from '../components/DetailPage'
import FullLoading from '../components/Loading'

function Detail() {
  return (
    <div className="w-full min-h-screen bg-light">
      <FullLoading />
      <Navbar />
      <DetailPage />
    </div>
  )
}

export default Detail
