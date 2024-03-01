import React, { useEffect } from 'react'
import gsap from 'gsap'

function Loading() {
  useEffect(() => {
    gsap.to('#loading-screen', { duration: 0.7, y: 10, opacity: 0, delay: 0.3, display: 'none' })
    gsap.to('#container-loading-screen', { duration: 0.1, delay: 1.5, display: 'none' })
  }, [])
  return (
    <div
      className="flex w-full h-screen justify-center items-center absolute top-0 left-0 bg-light"
      id="container-loading-screen"
    >
      <h2 className="text-dark text-6xl font-semibold takota tracking-widest" id="loading-screen">
        Ani<span className="text-red-500">`</span>chi
      </h2>
    </div>
  )
}

export default Loading
