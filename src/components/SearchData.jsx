import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import Card from './Card'

function SearchData() {
  const urlParams = new URLSearchParams(window.location.search)
  const title = urlParams.get('t')
  const navigate = useNavigate()
  const [animes, setAnimes] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const loadData = async (theTitle) => {
    try {
      const res = await axios.post('https://anichi-api.vercel.app/tserver/search', {
        title: theTitle
      })
      setAnimes(res.data.list)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (title) {
      loadData(title)
    }
  }, [title])

  return (
    <div className="section" id="recent">
      <div className="protest text-xl">
        <span className="pr-4 pb-2 border-b-2 border-red-500 capitalize">
          search result for <span className="text-red-500">{title.replace('+', ' ')} </span>
        </span>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="recent-container">
            {animes.map((el, i) => (
              <Card data={el} key={i} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default SearchData
