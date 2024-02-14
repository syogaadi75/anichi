import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import Card from './Card'

function Recent() {
  const navigate = useNavigate()
  const [recents, setRecents] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const loadData = async (navPage) => {
    try {
      const res = await axios.get('https://anichi-api.vercel.app/tserver/ongoing', {
        params: {
          page: navPage
        }
      })
      setRecents(res.data.list)
      setIsLoading(false)
      console.log(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData(page)
  }, [])

  return (
    <div className="section" id="recent">
      <div className="protest text-xl">
        <span className="pr-4 pb-2 border-b-2 border-red-500">New Release Anime</span>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="recent-container">
            {recents.map((el, i) => (
              <Card data={el} key={i} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button className="btn bg-red-500 text-light hover:shadow-red-500/50 ">
              <div>See Others</div>
              <ChevronDoubleRightIcon className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Recent
