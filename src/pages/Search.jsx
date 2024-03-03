import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'
import SearchData from '../components/SearchData'
import FullLoading from '../components/Loading'

function Search() {
  return (
    <div className="w-full min-h-screen bg-light">
      <FullLoading />
      <Navbar />
      <SearchData />
    </div>
  )
}

export default Search
