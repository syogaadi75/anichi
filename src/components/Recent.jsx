import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlayCircleIcon
} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
import ReactPaginate from 'react-paginate'

function Recent() {
  const navigate = useNavigate()
  const [recents, setRecents] = useState([])
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
      const res = await axios.get('https://anichi-api.vercel.app/tserver/ongoing', {
        params: {
          page: navPage
        }
      })
      setRecents(res.data.list)
      setPageCount(res.data.maxPage)
      setIsLoading(false)
      scrollToTop()
      console.log(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData(page)
  }, [])

  const handlePageClick = (event) => {
    const newPage = event.selected + 1
    setPage(newPage)
    loadData(newPage)
  }

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
          <ReactPaginate
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
          />
        </>
      )}
    </div>
  )
}

export default Recent
