import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'

function VideoPlayer() {
  const base_url = 'https://animex.biz.id'
  let { slug } = useParams()
  const iframeRef = useRef(null)
  const navigate = useNavigate()
  const [dataAnime, setDataAnime] = useState({})
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

  return (
    <div className="section" id="recent">
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div>
            <div className="protest text-xl lg:text-2xl mb-6">
              <span className="pr-5 pb-2 ">{dataAnime.title}</span>
            </div>
            {!iframeLoaded && <div>Loading...</div>}
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="w-full h-[200px] lg:w-[60%] lg:h-[450px]" id="iframe-container">
                <iframe
                  id="iframe-video"
                  className="w-full h-full rounded-lg shadow-lg shadow-dark/50  bg-dark"
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
                      className="btn hover:shadow-red-500 bg-red-500 text-white flex items-center"
                    >
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border-2 border-red-500 text-red-500 flex items-center">
                      <ChevronDoubleLeftIcon className="w-5 h-5" />
                      <span>Prev</span>
                    </button>
                  )}
                  {dataAnime.navigation?.next?.status ? (
                    <button
                      onClick={() => changeEpisode(dataAnime.navigation?.next?.slug)}
                      className="btn hover:shadow-red-500 bg-red-500 text-white flex items-center"
                    >
                      <span>Next</span>
                      <ChevronDoubleRightIcon className="w-5 h-5" />
                    </button>
                  ) : (
                    <button className="btn cursor-not-allowed border-2 border-red-500 text-red-500 flex items-center">
                      <span>Next</span>
                      <ChevronDoubleRightIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
                <div className="protest mt-4 text-xl mb-2">Pilih Server Video</div>
                <div className="flex flex-col-reverse gap-6">
                  {dataAnime?.servers?.map((el, i) => (
                    <div key={i} className="p-4 shadow-lg shadow-dark/10 text-sm rounded-lg">
                      <div className="mb-2 font-semibold">Server {el.resolution}</div>
                      <div className="flex flex-wrap gap-2">
                        {el?.server?.length > 0
                          ? el?.server?.map((val, j) => (
                              <button
                                onClick={() => changeResolution(val.data)}
                                className="btn border border-red-500 text-red-500 capitalize hover:bg-red-500 hover:text-white hover:shadow-red-500"
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
              <div className="rounded-xl w-full lg:w-1/2 order-2 lg:order-1">
                <div className="w-full rounded-xl p-6 bg-light shadow-2xl shadow-dark/10">
                  <h2 className="text-xl protest mb-4">List Episode</h2>
                  <div className="max-h-[400px] overflow-scroll">
                    {dataAnime?.episodes?.map((el, i) => (
                      <div
                        key={i}
                        className="w-full h-[40px] text-nowrap flex items-center border-b border-red-500 cursor-pointer hover:pl-4 hover:bg-red-500 hover:text-light transition-all duration-200 ease-out "
                        onClick={() => goToWatch(el.slug)}
                      >
                        {el.text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-xl w-full lg:w-1/2 order-1 lg:order-2">
                <div className="protest mt-4 text-xl mb-2">Download {dataAnime.title}</div>
                <div className="flex flex-col-reverse gap-6">
                  {dataAnime?.downloads?.map((el, i) => (
                    <div key={i} className="p-4 shadow-lg shadow-dark/10 text-sm rounded-lg">
                      <div className="mb-2 font-semibold">{el.resolution}</div>
                      <div className="flex flex-wrap gap-2">
                        {el?.server?.length > 0
                          ? el?.server?.map((val, j) => (
                              <button
                                onClick={() => downloadAnime(val.src)}
                                className="btn border border-red-500 text-red-500 capitalize hover:bg-red-500 hover:text-white hover:shadow-red-500"
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
