import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import {
  ArrowRightCircleIcon,
  ArrowRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlayCircleIcon
} from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
import ReactPaginate from 'react-paginate'
import GifLoading from './GifLoading'

function Recent() {
  const navigate = useNavigate()
  const [ongoing, setOngoing] = useState([])
  const [completed, setCompleted] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [navigation, setNavigation] = useState({})

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const loadData = async (url) => {
    setIsLoading(true)
    try {
      const encode = btoa(url)
      const res = await axios.get('https://anichi-api.vercel.app/sserver/home?url='+url)
      setOngoing(res.data.animes) 
      setNavigation(res.data.navigation)
      setIsLoading(false)
      scrollToTop()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData(`https://samehadaku.today`)
  }, [])

  // const handlePageClick = (event) => {
  //   const newPage = event.selected + 1
  //   setPage(newPage)
  //   loadData(newPage)
  // }

  return (
    <div className="section" id="recent">
      <div className="text-xl flex-col lg:flex-row text-center lg:text-left gap-2 flex justify-between">
        <div className="pb-2 takota text-3xl lg:text-5xl text-center w-full">
          Rilis <span className="text-secondary">`|,</span> Terbaru
        </div>
      </div>

      {isLoading ? (
        <GifLoading />
      ) : (
        <>
          <div className="recent-container">
            {ongoing.map((el, i) => (
              <Card recent={true} data={el} key={i} />
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-4">
          { navigation?.prev.status ? (
            <button
              className="protest text-base flex items-center gap-1 py-2 px-3 rounded-lg bg-secondary text-white shadow-lg shadow-secondary/70 dark:shadow-none hover:-translate-y-1 transition-all"
              onClick={() => loadData(navigation.prev.slug)}
            >
              <ChevronDoubleLeftIcon className="w-5" strokeWidth={2} />
              <span>Prev</span>
            </button>
          ) : '' }
          { navigation?.next.status ? (
            <button
              className="protest text-base flex items-center gap-1 py-2 px-3 rounded-lg bg-secondary text-white shadow-lg shadow-secondary/70 dark:shadow-none hover:-translate-y-1 transition-all"
              onClick={() => loadData(navigation.next.slug)}
            >
              <span>Next</span>
              <ChevronDoubleRightIcon className="w-5" strokeWidth={2} />
            </button>
          ) : '' }
          </div>
        </>
      )} 
    </div>
  )
}

export default Recent
