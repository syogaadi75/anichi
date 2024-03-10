import React, { useEffect, useState } from 'react'
import Gif from '../assets/loading.gif'
import DarkGif from '../assets/dark-loading.gif'

function GifLoading() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  useEffect(() => {
    const htmlElement = document.querySelector('html')
    if (htmlElement.classList.contains('dark')) {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  }, [])

  return (
    <div className="flex justify-center w-full h-full items-center">
      <img className="w-[300px]" src={isDarkMode ? DarkGif : Gif} />
    </div>
  )
}

export default GifLoading
