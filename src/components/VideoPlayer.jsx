import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import FullLoading from './Loading'
import GifLoading from './GifLoading'
import Popular from './Popular'

function VideoPlayer() {
  let { slug } = useParams()
  const iframeRef = useRef(null)
  const navigate = useNavigate()
  const [dataAnime, setDataAnime] = useState({})
  const [dataEpisodes, setDataEpisodes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isNextEps, setIsNextEps] = useState(null)
  const [isPrevEps, setIsPrevEps] = useState(null)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const loadData = async (s, e, se) => {
    setIsLoading(true)
    setIframeLoaded(false)
    try {
      const res = await axios.get('https://anichi-api.vercel.app/sserver/video/?url=' + s)

      setDataAnime(res.data)
      setDataEpisodes(res.data.episodes.list)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (slug) {
      const decode = atob(slug)
      loadData(decode)
    }
  }, [slug])

  const goToWatch = (slug) => {
    const encode = btoa(slug)
    navigate(`/watch/${encode}`)
  }

  const changeEpisode = (slug) => {
    const encode = btoa(slug)
    navigate(`/watch/${encode}`)
  }

  const goToDetail = (slug) => {
    const encode = btoa(slug)
    navigate(`/anime/${encode}`)
  }

  const changeResolution = async (src) => {
    setIframeLoaded(false)
    try {
      iframeRef.current.src = src
    } catch (error) {
      console.log(error)
    }
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  const downloadAnime = (src) => {
    window.open(src, '_blank')
  }

  const searchEpisode = (text) => {
    if (text) {
      const filtered = dataAnime.episodes.list.filter((item) => item.slug.includes(text))
      setDataEpisodes(filtered)
    } else {
      setDataEpisodes(dataAnime.episodes.list)
    }
  }

  return (
    <div className="section" id="recent">
      {isLoading ? (
        <FullLoading />
      ) : (
        <>
          <div>
            <div className="protest text-xl lg:text-2xl mb-1 group cursor-pointer" onClick={() => goToDetail(dataAnime?.detail_anime?.slug)}>
              <span className="pr-5 pb-2 group-hover:text-secondary group-hover:underline transition-all">
                {dataAnime.title.replace('Sub Indonesia', '')}
              </span>
            </div>
            <div className='mb-6 text-sm text-gray-400'>Released On {dataAnime.released_at}</div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full h-[200px] lg:w-[60%] lg:h-[450px]" id="iframe-container">
                {!iframeLoaded ? <GifLoading /> : ''}
                <iframe
                  id="iframe-video"
                  className={`w-full h-full rounded-lg shadow-lg shadow-dark/50  bg-dark ${
                    !iframeLoaded ? 'hidden' : ''
                  }`}
                  src={dataAnime.main_server}
                  onLoad={handleIframeLoad}
                  ref={iframeRef}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full lg:w-[40%]">
                <div className="flex gap-3 justify-center lg:justify-start">
                  {dataAnime.prev?.status ? (
                    <button
                      onClick={() => changeEpisode(dataAnime?.prev?.slug)}
                      className="btn hover:shadow-secondary bg-secondary text-white flex items-center"
                    >
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border border-secondary text-secondary bg-secondary/5 flex items-center hover:translate-y-0">
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  )}
                  <button
                      onClick={() => goToDetail(dataAnime?.detail_anime?.slug)}
                      className="btn hover:shadow-secondary bg-secondary text-white flex items-center"
                    >
                      <span>Detail Anime</span>
                    </button>
                  {dataAnime?.next?.status ? (
                    <button
                      onClick={() => changeEpisode(dataAnime?.next?.slug)}
                      className="btn hover:shadow-secondary bg-secondary text-white flex items-center"
                    >
                      <span>Next</span>
                      <ChevronDoubleRightIcon className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border border-secondary text-secondary bg-secondary/5 flex items-center hover:translate-y-0">
                      <span>Next</span>
                      <ChevronDoubleRightIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="text-2xl takota mt-8 lg:mt-4 mb-4 tracking-widest text-center lg:text-left">
                  Pilih Server Video
                </div> 
                <div className="grid grid-cols-3 gap-2 lg:gap-4">
                  {dataAnime?.list_server?.map((el, i) => (
                    <button
                      key={i}
                      onClick={() => changeResolution(el.src)}
                      className="btn text-secondary bg-secondary/5 hover:shadow-md hover:shadow-secondary/70 hover:bg-secondary hover:text-light font-semibold text-xs lg:text-sm"
                    >
                      <div className='w-full text-center lg:text-left'>{el.server}</div>
                    </button> 
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row mt-8 lg:mt-12 lg:gap-8">
              <div className="rounded-xl w-full lg:w-[60%]">
                <div className="w-full ">
                  <h2 className="text-2xl takota mb-4 tracking-widest text-center lg:text-left">
                    Episode List
                  </h2>
                  <div className="mb-2">
                    <input
                      className="input-search-eps"
                      type="text"
                      placeholder="Cari Episode"
                      onKeyUp={(e) => searchEpisode(e.currentTarget.value)}
                    />
                  </div>
                  <div className="max-h-[320px] lg:max-h-[300px] overflow-auto flex flex-col gap-2 pr-2">
                    {dataEpisodes.length === 0 ? (
                      <div className="w-full py-2 px-2 rounded-md text-nowrap flex items-center cursor-pointer pl-2 shadow-md shadow-secondary/70 bg-secondary text-light transition-all duration-200 ease-out text-sm lg:text-base protest tracking-wide">
                        Episode tidak tersedia
                      </div>
                    ) : (
                      ''
                    )}
                    {dataEpisodes?.map((el, i) => (
                      <div
                        key={i}
                        className="w-full py-2 px-2 rounded-md text-nowrap flex items-center cursor-pointer pl-2 text-secondary bg-secondary/5 hover:shadow-md hover:shadow-secondary/70 hover:pl-4 hover:bg-secondary hover:text-light transition-all duration-200 ease-out text-sm lg:text-base protest tracking-wide"
                        onClick={() => goToWatch(el.slug)}
                      >
                        {el.title?.replace('Subtitle Indonesia', '')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-xl w-full lg:w-[40%]">
                <div className="mt-4 text-2xl text-center lg:text-left takota tracking-wider mb-4">
                  Popular Series
                </div>
                <div>
                  <Popular data={dataAnime.popular} />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8">
              {dataAnime?.downloads?.map((el, i) => (
                <div key={i} className="rounded-xl w-full lg:w-1/2">
                  <div className="mt-4 text-2xl text-center lg:text-left takota tracking-wider mb-4">
                    {el.title}
                  </div>
                  <div className="flex flex-col-reverse gap-6">
                    {el?.servers.map((val, j) => (
                      <>
                        {val?.resolution && val.links.length !== 0 ? (
                          <div key={'val'+j} className=" text-sm rounded-lg">
                            <div className="mb-2 protest tracking-wider text-md">{val.resolution}</div>
                            <div className="flex flex-wrap gap-2">
                              { val.links.map((value, k) => (
                                <button
                                  key={'value'+k}
                                  onClick={() => downloadAnime(value.src)}
                                  className="btn border border-secondary text-secondary capitalize hover:bg-secondary hover:text-white hover:shadow-secondary"
                                >
                                  {value.name}
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : ''}
                      </>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoPlayer
