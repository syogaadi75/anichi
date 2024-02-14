import React, { useEffect } from 'react'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import Recent from '../components/Recent'
import SearchData from '../components/SearchData'

function Search() {
  return (
    <div className="w-full min-h-screen bg-light">
      <Loading />
      <Navbar />
      <SearchData />
    </div>
  )
}

export default Search
