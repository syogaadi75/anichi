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
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [iframeSrc, setIframeSrc] = useState('')

  const loadData = async (s) => {
    setIsLoading(true)
    setIframeLoaded(false)
    try {
      const res = await axios.get(import.meta.env.VITE_ANICHI_API_URL + '/watch?slug=' + s)

      const default_server = res.data.default_server
      await changeResolution(default_server.nume, default_server.post, default_server.type)
      setDataAnime(res.data)
      setDataEpisodes(res.data.list_episodes)
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
    loadData(slug)
  }

  const goToDetail = (slug) => {
    navigate(`/anime/${slug}`)
  }

  const changeResolution = async (nume, post, type) => {
    setIframeLoaded(false)
    try {
      const res = await axios.post(import.meta.env.VITE_ANICHI_API_URL + '/change-server', {
        nume,
        post,
        type
      })

      if (res.data.src) {
        setIframeSrc(res.data.src)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIframeLoaded(true)
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
      const filtered = dataAnime.list_episodes.filter((item) => item.title.includes(text))
      setDataEpisodes(filtered)
    } else {
      setDataEpisodes(dataAnime.list_episodes)
    }
  }

  return (
    <div className="section" id="recent">
      {isLoading ? (
        <FullLoading />
      ) : (
        <>
          <div>
            <div className="protest text-xl lg:text-2xl mb-1 group cursor-pointer" onClick={() => goToDetail(dataAnime?.slug)}>
              <span className="pr-5 pb-2 group-hover:text-secondary group-hover:underline transition-all">
                {dataAnime?.title} Episode {dataAnime?.episode}
              </span>
            </div>
            <div className="mb-6 text-sm text-gray-400">Released on {dataAnime.released_on} ago</div>
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full h-[200px] lg:w-[60%] lg:h-[450px]" id="iframe-container">
                {!iframeLoaded ? <GifLoading /> : ''}
                <iframe
                  id="iframe-video"
                  className={`w-full h-full rounded-lg shadow-lg shadow-dark/50  bg-dark ${!iframeLoaded ? 'hidden' : ''}`}
                  src={iframeSrc}
                  onLoad={handleIframeLoad}
                  ref={iframeRef}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full lg:w-[40%]">
                <div className="flex gap-3 justify-center lg:justify-start">
                  {dataAnime.prev?.status ? (
                    <button onClick={() => changeEpisode(dataAnime?.prev?.slug)} className="btn hover:shadow-secondary bg-secondary text-white flex items-center">
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border border-secondary text-secondary bg-secondary/5 flex items-center hover:translate-y-0">
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  )}
                  <button onClick={() => goToDetail(dataAnime?.slug)} className="btn hover:shadow-secondary bg-secondary text-white flex items-center">
                    <span>Detail Anime</span>
                  </button>
                  {dataAnime?.next?.status ? (
                    <button onClick={() => changeEpisode(dataAnime?.next?.slug)} className="btn hover:shadow-secondary bg-secondary text-white flex items-center">
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
                <div className="text-2xl takota mt-8 lg:mt-4 mb-4 tracking-widest text-center lg:text-left">Pilih Server Video</div>
                <div className="grid grid-cols-3 gap-2 lg:gap-4">
                  {dataAnime?.list_server?.map((el, i) => (
                    <button
                      key={i}
                      onClick={async () => await changeResolution(el.nume, el.post, el.type)}
                      className="btn text-secondary bg-secondary/5 hover:shadow-md hover:shadow-secondary/70 hover:bg-secondary hover:text-light font-semibold text-xs lg:text-sm"
                    >
                      <div className="w-full text-center lg:text-left">{el.title}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-4 flex-col lg:flex-row mt-8 lg:mt-12 lg:gap-8">
              <div className="rounded-xl w-full lg:w-[60%]">
                <div className="w-full ">
                  <h2 className="text-2xl takota mb-4 tracking-widest text-center lg:text-left">Episode List</h2>
                  <div className="mb-2">
                    <input className="input-search-eps" type="text" placeholder="Cari Episode" onKeyUp={(e) => searchEpisode(e.currentTarget.value)} />
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
                        {el.title}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mt-8">
              <h2 className="text-2xl takota tracking-widest text-center lg:text-left">
                Download {dataAnime?.title} Episode {dataAnime?.episode}
              </h2>
              {dataAnime?.download?.map((el, i) => (
                <div key={i} className="rounded-xl w-full lg:w-1/2">
                  <div className="mt-4 text-2xl text-center lg:text-left takota tracking-wider mb-4">{el.format}</div>
                  <div key={'xx' + i} className="flex flex-col-reverse gap-6">
                    {el?.resolutions.map((val, j) => (
                      <div key={'val' + j} className=" text-sm rounded-lg">
                        <div className="mb-2 protest tracking-wider text-md">{val.resolution}</div>
                        <div className="flex flex-wrap gap-2">
                          {val.links.map((value, k) => (
                            <button
                              key={'value' + k}
                              onClick={() => downloadAnime(value.slug)}
                              className="btn border border-secondary text-secondary capitalize hover:bg-secondary hover:text-white hover:shadow-secondary"
                            >
                              {value.title}
                            </button>
                          ))}
                        </div>
                      </div>
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
