import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'
import FullLoading from './Loading'
import GifLoading from './GifLoading'

function VideoPlayer() {
  const base_url = 'https://animex.biz.id'
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
      const res = await axios.get('https://anichi-api.vercel.app/tserver/get-video/' + s)

      setDataAnime(res.data)
      setDataEpisodes(res.data.episodes)
      console.log(res.data, 'res.data')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (slug) {
      loadData(slug)
    }
  }, [slug])

  const goToWatch = (slug) => {
    navigate(`/watch/${slug}`)
  }

  const changeEpisode = (slug) => {
    navigate(`/watch/${slug}`)
  }

  const changeResolution = async (src) => {
    setIframeLoaded(false)
    const res = await axios.get('https://anichi-api.vercel.app/tserver/changeServer/' + src)
    try {
      iframeRef.current.src = res.data.src
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
      const filtered = dataAnime.episodes.filter((item) => item.slug.includes(text))
      setDataEpisodes(filtered)
    } else {
      setDataEpisodes(dataAnime.episodes)
    }
  }

  return (
    <div className="section" id="recent">
      {isLoading ? (
        <FullLoading />
      ) : (
        <>
          <div>
            <div className="protest text-xl lg:text-2xl mb-6">
              <span className="pr-5 pb-2 ">
                {dataAnime.title.replace('Subtitle Indonesia', '')}
              </span>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full h-[200px] lg:w-[60%] lg:h-[450px]" id="iframe-container">
                {!iframeLoaded ? <GifLoading /> : ''}
                <iframe
                  id="iframe-video"
                  className={`w-full h-full rounded-lg shadow-lg shadow-dark/50  bg-dark ${
                    !iframeLoaded ? 'hidden' : ''
                  }`}
                  src={dataAnime.defaultPlayer}
                  onLoad={handleIframeLoad}
                  ref={iframeRef}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full lg:w-[40%]">
                <div className="flex gap-3">
                  {dataAnime.navigation?.prev?.status ? (
                    <button
                      onClick={() => changeEpisode(dataAnime.navigation?.prev?.slug)}
                      className="btn hover:shadow-secondary bg-secondary text-white flex items-center"
                    >
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border-2 border-secondary text-secondary flex items-center">
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  )}
                  {dataAnime.navigation?.next?.status ? (
                    <button
                      onClick={() => changeEpisode(dataAnime.navigation?.next?.slug)}
                      className="btn hover:shadow-secondary bg-secondary text-white flex items-center"
                    >
                      <span>Next</span>
                      <ChevronDoubleRightIcon className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border-2 border-secondary text-secondary flex items-center">
                      <span>Next</span>
                      <ChevronDoubleRightIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="text-2xl takota mt-8 lg:mt-4 mb-2 tracking-widest text-center lg:text-left">
                  Pilih Server Video
                </div>
                <div className="flex flex-col-reverse gap-6">
                  {dataAnime?.servers?.map((el, i) => (
                    <div key={i} className=" text-sm rounded-lg">
                      <div className="mb-2 tracking-wider protest">Server {el.resolution}</div>
                      <div className="flex flex-wrap gap-2">
                        {el?.server?.length > 0
                          ? el?.server?.map((val, j) => (
                              <button
                                onClick={() => changeResolution(val.data)}
                                className="btn border border-secondary text-secondary capitalize hover:bg-secondary hover:text-white hover:shadow-secondary"
                              >
                                {val.text == 'ondesuhd' || val.text == 'ondesu3'
                                  ? 'Anichi'
                                  : val.text}
                              </button>
                            ))
                          : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row mt-8 lg:mt-12">
              <div className="rounded-xl w-full lg:w-1/2">
                <div className="w-full p-4 ">
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
                      <div className="w-full py-2 px-2 rounded-md text-nowrap flex items-center cursor-pointer pl-2 shadow-md shadow-secondary/70 pl-4 bg-secondary text-light transition-all duration-200 ease-out text-sm lg:text-base protest tracking-wide">
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
                        {el.text.replace('Subtitle Indonesia', '')}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-xl w-full lg:w-1/2">
                <div className="mt-4 text-2xl text-center lg:text-left takota tracking-wider mb-4">
                  Download {dataAnime.title?.replace('Subtitle Indonesia', '')}
                </div>
                <div className="flex flex-col-reverse gap-6">
                  {dataAnime?.downloads?.map((el, i) => (
                    <div key={i} className=" text-sm rounded-lg">
                      <div className="mb-2 protest tracking-wider text-md">{el.resolution}</div>
                      <div className="flex flex-wrap gap-2">
                        {el?.server?.length > 0
                          ? el?.server?.map((val, j) => (
                              <button
                                onClick={() => downloadAnime(val.src)}
                                className="btn border border-secondary text-secondary capitalize hover:bg-secondary hover:text-white hover:shadow-secondary"
                              >
                                {val.text}
                              </button>
                            ))
                          : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoPlayer
