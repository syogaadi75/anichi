import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ArrowRightCircleIcon, ArrowRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
import ReactPaginate from 'react-paginate'
import GifLoading from './GifLoading'
import Popular from './Popular'
import LandscapeCard from './LandscapeCard'

function Recent() {
  const navigate = useNavigate()
  const [ongoing, setOngoing] = useState([])
  const [completed, setCompleted] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [navigation, setNavigation] = useState({})
  const [popular, setPopular] = useState([])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const loadData = async (url) => {
    setIsLoading(true)
    try {
      const res = await axios.get(import.meta.env.VITE_ANICHI_API_URL + '/home')
      setOngoing(res.data)
      // setPopular(res.data.popular)
      // setNavigation(res.data.navigation)
      setIsLoading(false)
      scrollToTop()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // const handlePageClick = (event) => {
  //   const newPage = event.selected + 1
  //   setPage(newPage)
  //   loadData(newPage)
  // }

  return (
    <div className="section" id="recent">
      <div className="flex flex-col lg:flex-row">
        <div className="w-full">
          <div className="text-xl flex-col lg:flex-row text-center lg:text-left gap-2 flex justify-between">
            <div className="takota text-3xl lg:text-5xl text-center w-full">
              Rilis <span className="text-secondary">`|,</span> Terbaru
            </div>
          </div>

          {isLoading ? (
            <GifLoading />
          ) : (
            <>
              <div className="recent-container">
                {ongoing?.map((el, i) => (
                  <LandscapeCard data={el} key={i} />
                ))}
              </div>
              <div className="flex justify-center mt-4 lg:mt-6">
                <button className="btn bg-secondary" onClick={() => navigate('/ongoing')}>
                  <span>Lihat Selengkapnya</span>
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Recent
