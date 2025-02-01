import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import { ArrowRightCircleIcon, ArrowRightIcon, ChevronDoubleLeftIcon, ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/outline'
import FullLoading from '../components/Loading'
import GifLoading from '../components/GifLoading'
import LandscapeCard from '../components/LandscapeCard'

function Ongoing() {
  const navigate = useNavigate()
  const [ongoing, setOngoing] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)
  const [pageActive, setPageActive] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const loadData = async (page) => {
    setIsLoading(true)
    try {
      const params = {
        page
      }
      const res = await axios.get(import.meta.env.VITE_ANICHI_API_URL + '/latest-anime', {
        params: params
      })
      setOngoing(res.data.animes)
      setPageCount(res.data.pagination.maxPage)
      setIsLoading(false)
      scrollToTop()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function fetchData() {
      console.log(page, 'page')
      await loadData(page)
    }
    fetchData()
  }, [page])

  const handlePageClick = (event) => {
    const newPage = event.selected + 1
    setPage(newPage)
  }

  return (
    <div className="w-full min-h-screen bg-light dark:bg-dark text-dark dark:text-light">
      <FullLoading />
      <Navbar />

      <div className="section" id="ongoing">
        <div className="flex-col lg:flex-row text-center lg:text-left gap-2 flex justify-center">
          <div className="pr-4 pb-2 text-3xl lg:text-5xl takota tracking-wider">
            Anime <span className="text-secondary">`|,</span> Terbaru
          </div>
        </div>
        {isLoading ? (
          <GifLoading />
        ) : (
          <>
            <div className="recent-container">
              {ongoing.map((el, i) => (
                <LandscapeCard data={el} key={i} />
              ))}
            </div>
            <ReactPaginate
              breakLabel="..."
              nextLabel={
                <div
                  className={`${
                    page === pageCount || page > pageCount ? 'cursor-not-allowed bg-dark' : 'cursor-pointer bg-secondary hover:shadow-lg hover:shadow-secondary/70 transition-all'
                  } flex items-center gap-1 rounded-lg text-white py-2 px-2 text-sm`}
                >
                  <span>Next</span>
                  <ChevronDoubleRightIcon className="w-4" strokeWidth={2} />
                </div>
              }
              previousLabel={
                <div
                  className={`${
                    page === 1 ? 'cursor-not-allowed bg-dark' : 'cursor-pointer bg-secondary hover:shadow-lg hover:shadow-secondary/70 transition-all'
                  } flex items-center gap-1 rounded-lg text-white py-2 px-2 text-sm`}
                >
                  <ChevronDoubleLeftIcon className="w-4" strokeWidth={2} />
                  <span>Prev</span>
                </div>
              }
              onPageChange={handlePageClick}
              pageCount={pageCount}
              initialPage={page - 1}
              renderOnZeroPageCount={null}
              activeClassName="pagination-active"
              className="pagination-container"
              pageLinkClassName="pagination-page"
            />
          </>
        )}
      </div>
    </div>
  )
}

export default Ongoing
