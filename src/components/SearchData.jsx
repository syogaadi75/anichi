import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import CardSearch from './CardSearch'
import GifLoading from './GifLoading'

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
        anime: theTitle
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
        <span className="pr-4 pb-2 border-b-2 border-secondary capitalize">
          hasil pencarian <span className="text-secondary">{title.replace('+', ' ')} </span>
        </span>
      </div>
      {isLoading ? (
        <GifLoading />
      ) : (
        <>
          {animes.length > 0 ? (
            <div className="recent-container">
              {animes.map((el, i) => (
                <CardSearch data={el} key={i} />
              ))}
            </div>
          ) : (
            <div className="w-full flex justify-center items-center mt-8">
              <div className="tracking-wider">
                Anime dengan judul <span className="text-secondary">{title.replace('+', ' ')}</span>{' '}
                belum tersedia.
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default SearchData
