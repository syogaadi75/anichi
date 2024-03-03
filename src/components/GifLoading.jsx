import React from 'react'
import Gif from '../assets/loading.gif'

function GifLoading() {
  return (
    <div className="flex justify-center w-full">
      <img className="w-[300px]" src={Gif} />
    </div>
  )
}

export default GifLoading
