import React, { useEffect } from 'react'
import gsap from 'gsap'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'
import DetailPage from '../components/DetailPage'

function Detail() {
  return (
    <div className="w-full min-h-screen bg-light">
      <Loading />
      <Navbar />
      <DetailPage />
    </div>
  )
}

export default Detail
