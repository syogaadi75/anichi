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

function Recent() {
  const navigate = useNavigate()
  const [ongoing, setOngoing] = useState([])
  const [completed, setCompleted] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const loadData = async (navPage) => {
    try {
      const res = await axios.get('https://anichi-api.vercel.app/tserver/recent', {
        params: {
          page: navPage
        }
      })
      setOngoing(res.data.ongoing)
      setCompleted(res.data.completed)
      setIsLoading(false)
      scrollToTop()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData(page)
  }, [])

  // const handlePageClick = (event) => {
  //   const newPage = event.selected + 1
  //   setPage(newPage)
  //   loadData(newPage)
  // }

  return (
    <div className="section" id="recent">
      <div className="text-xl flex-col lg:flex-row text-center lg:text-left gap-2 flex justify-between">
        <div className="pr-4 pb-2 takota text-3xl lg:text-5xl text-center w-full">
          Rilis <span className="text-red-500">`|,</span> Terbaru
        </div>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="recent-container">
            {ongoing.map((el, i) => (
              <Card recent={true} data={el} key={i} />
            ))}
          </div>
          <div className="flex justify-center mt-8 ">
            <button
              className="protest text-base flex items-center gap-1 py-2 px-3 rounded-lg bg-red-500 text-white shadow-lg shadow-red-500/70 hover:-translate-y-1 transition-all"
              onClick={() => navigate('/ongoing')}
            >
              <span>Lihat Selengkapnya</span>
              <ChevronDoubleRightIcon className="w-5" strokeWidth={2} />
            </button>
          </div>
        </>
      )}

      <div className="protest text-xl flex-col lg:flex-row text-center lg:text-left gap-2 flex justify-between mt-16 lg:mt-24">
        <div className="pr-4 pb-2 takota text-3xl lg:text-5xl text-center w-full">
          Sudah <span className="text-red-500">`|,</span> Tamat
        </div>
      </div>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="recent-container">
            {completed.map((el, i) => (
              <Card recent={false} data={el} key={i} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="protest text-base flex items-center gap-1 py-2 px-3 rounded-lg bg-red-500 text-white shadow-lg shadow-red-500/70 hover:-translate-y-1 transition-all"
              onClick={() => navigate('/completed')}
            >
              <span>Lihat Selengkapnya</span>
              <ChevronDoubleRightIcon className="w-5" strokeWidth={2} />
            </button>
          </div>
          {/* <ReactPaginate
            breakLabel="..."
            nextLabel={
              <ChevronDoubleRightIcon
                className={`${
                  page === 4
                    ? 'cursor-not-allowed bg-dark'
                    : 'cursor-pointer bg-red-500 hover:shadow-lg hover:shadow-red-500/70 transition-all'
                } w-9 h-9 rounded-lg text-white py-2 px-2`}
              />
            }
            previousLabel={
              <ChevronDoubleLeftIcon
                className={`${
                  page === 1
                    ? 'cursor-not-allowed bg-dark'
                    : 'cursor-pointer bg-red-500 hover:shadow-lg hover:shadow-red-500/70 transition-all'
                } w-9 h-9 rounded-lg text-white py-2 px-2`}
              />
            }
            onPageChange={handlePageClick}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            activeClassName="pagination-active"
            className="pagination-container"
            pageLinkClassName="pagination-page"
          /> */}
        </>
      )}
    </div>
  )
}

export default Recent
