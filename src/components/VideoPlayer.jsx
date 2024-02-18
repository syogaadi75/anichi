import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'

function VideoPlayer() {
  const base_url = 'https://animex.biz.id'
  let { slug, episode } = useParams()
  const urlParams = new URLSearchParams(window.location.search)
  const subepisode = urlParams.get('se')
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
      let params = {
        slug: s,
        episode: e,
        subepisode: ''
      }
      if (se) {
        params.subepisode = se
      }
      const res = await axios.get('https://anichi-api.vercel.app/tserver/get-video', {
        params: params
      })

      const firstEps = res.data.episodes[res.data.episodes.length - 1]
      const dataEpisode = res.data.episodes.find((e) => e.episode == episode)
      const indexEps = res.data.episodes.indexOf(dataEpisode)
      if (indexEps == '0') {
        setIsNextEps(null)
        setIsPrevEps('ada')
      } else {
        if (dataEpisode.episode == firstEps.episode) {
          setIsPrevEps(null)
        } else {
          setIsPrevEps('ada')
        }
        setIsNextEps('ada')
      }

      setDataAnime(res.data)
      console.log(res.data, 'res.data')
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (slug && episode) {
      console.log(subepisode, 'subepisode')
      if (subepisode) {
        loadData(slug, episode, subepisode)
      } else {
        loadData(slug, episode)
      }
    }
  }, [slug, episode, subepisode])

  const goToWatch = (slug, episode) => {
    navigate(`/watch/${slug}/${episode}`)
  }

  const changeEpisode = (action) => {
    if (action === 'next') {
      const newEps = Number(episode) + 1
      navigate(`/watch/${slug}/${newEps}`)
    } else if (action === 'prev') {
      const newEps = Number(episode) - 1
      navigate(`/watch/${slug}/${newEps}`)
    }
  }

  const changeResolution = (src, text) => {
    setIframeLoaded(false)
    axios.get(src).then((res) => {
      if (text == 'AnimeX') {
        let newSrc = base_url + '/anime/video2?video=' + btoa(res.data.data)
        iframeRef.current.src = newSrc
        console.log(res.data.data)
      } else {
        iframeRef.current.src = res.data.data
      }
    })
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
                  src={dataAnime.defaultSrc}
                  onLoad={handleIframeLoad}
                  ref={iframeRef}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-full lg:w-[40%]">
                <div className="flex gap-3">
                  {isPrevEps == 'ada' ? (
                    <button
                      onClick={() => changeEpisode('prev')}
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
                  {isNextEps == 'ada' ? (
                    <button
                      onClick={() => changeEpisode('next')}
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
                      <div className="mb-2 font-semibold">Server {el.resolution}p</div>
                      <div className="flex flex-wrap gap-2">
                        {el?.list?.length > 0
                          ? el?.list?.map((val, j) => (
                              <button
                                onClick={() => changeResolution(val.src, val.text)}
                                className="btn border border-red-500 text-red-500 capitalize hover:bg-red-500 hover:text-white hover:shadow-red-500"
                              >
                                {val.text == 'AnimeX' ? 'Anichi' : val.text}
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
                        onClick={() => goToWatch(el.slug, el.episode, el.subepisode)}
                      >
                        Episode {el.episode}
                        {el.subEpisode != '-' ? '.' + el.subEpisode : ''} -{' '}
                        {dataAnime?.title?.split('Episode')[0].trim()}
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
                      <div className="mb-2 font-semibold">{el.type}</div>
                      <div className="flex flex-wrap gap-2">
                        {el?.sources?.length > 0
                          ? el?.sources?.map((val, j) => (
                              <button
                                onClick={() => downloadAnime(val.src)}
                                className="btn border border-red-500 text-red-500 capitalize hover:bg-red-500 hover:text-white hover:shadow-red-500"
                              >
                                {val.source}
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
