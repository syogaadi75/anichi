import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import CardSearch from './CardSearch'
import GifLoading from './GifLoading'
import { ChevronDoubleLeftIcon } from '@heroicons/react/24/outline'
import Popular from './Popular'

function SearchData() {
  const urlParams = new URLSearchParams(window.location.search)
  const title = urlParams.get('t')
  const navigate = useNavigate()
  const [animes, setAnimes] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [pagination, setPagination] = useState({})
  const [popular, setPopular] = useState([])

  const loadData = async (url) => {
    setIsLoading(true)
    try { 
      console.log(url, 'url')
      const encode = btoa(url)
      const res = await axios.get('https://anichi-api.vercel.app/sserver/search?url='+encode)
      setAnimes(res.data.animes)
      setPopular(res.data.popular)
      setPagination(res.data.pagination)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (title) {
      loadData('https://samehadaku.today?s=' + title.replace(' ', '+'))
    }
  }, [title])

  return (
    <div className="section" id="recent">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className='w-full lg:w-[70%]'>
          <div className="protest text-xl">
            <span className="pr-4 pb-2 border-b-2 border-secondary capitalize">
              hasil pencarian <span className="text-secondary">{title.replace('+', ' ')} </span>
            </span>
          </div>
          {isLoading ? (
            <GifLoading />
          ) : (
            <>
              {animes?.length > 0 ? (
                <>
                  <div className="recent-container">
                    {animes.map((el, i) => (
                      <CardSearch data={el} key={i} />
                    ))}
                  </div>
                  <div className="flex justify-center mt-8 gap-2 flex-wrap w-full">
                    { pagination?.prev.status ? (
                      <button
                        className="protest text-base flex items-center gap-1 py-2 px-3 rounded-lg bg-secondary text-white shadow-lg shadow-secondary/70 dark:shadow-none hover:-translate-y-1 transition-all"
                        onClick={() => loadData(pagination.prev.slug)}
                      >
                        <ChevronDoubleLeftIcon className="w-5" strokeWidth={2} />
                        <span>Prev</span>
                      </button>
                    ) : '' }
                    { pagination?.list.map((el, i) => (
                      <button
                        key={i}
                        className={`protest text-base py-2 px-4 rounded-lg text-secondary bg-secondary/10 shadow-lg shadow-secondary/70 dark:shadow-none hover:-translate-y-1 transition-all ${
                          el.current ? 'bg-red-500 text-white dark:bg-secondary ' : ''
                        }`}
                        onClick={() => loadData(el.slug)}
                      >
                        <span>{el.title}</span>
                      </button>
                    ))}
                    { pagination?.next.status ? (
                      <button
                        className="protest text-base flex items-center gap-1 py-2 px-3 rounded-lg bg-secondary text-white shadow-lg shadow-secondary/70 dark:shadow-none hover:-translate-y-1 transition-all"
                        onClick={() => loadData(pagination.next.slug)}
                      >
                        <span>Next</span>
                        <ChevronDoubleRightIcon className="w-5" strokeWidth={2} />
                      </button>
                    ) : '' }
                  </div>
                </>
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
        <div className='w-full lg:w-[30%]'>
          <div className="flex-col lg:flex-row text-center lg:text-left gap-2 flex justify-between mb-8">
            <div className="pb-2 takota text-3xl lg:text-5xl text-center w-full">
              Popular
            </div>
          </div>
          <div>
            {!isLoading ? <Popular data={popular} /> : ''}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchData
