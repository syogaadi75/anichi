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
      setDataAnime(res.data)
      setIsLoading(false)
      console.log(res.data)
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

  return (
    <div className="section" id="recent">
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div>
            <div className="protest text-2xl mb-6">
              <span className="pr-5 pb-2 border-b-2 border-red-500">{dataAnime.title}</span>
            </div>
            {!iframeLoaded && <div>Loading...</div>}
            <div className="flex gap-8">
              <div className="w-[60%] h-[450px]" id="iframe-container">
                <iframe
                  id="iframe-video"
                  className="w-full h-full rounded-lg shadow-xl shadow-dark/50  bg-dark"
                  src={dataAnime.defaultSrc}
                  onLoad={handleIframeLoad}
                  ref={iframeRef}
                  allowFullScreen
                ></iframe>
              </div>
              <div className="w-[40%]">
                <div className="flex gap-3">
                  <button className="btn hover:shadow-red-500 bg-red-500 text-white flex items-center">
                    <ChevronDoubleLeftIcon className="w-5 h-5" />
                    <span>Prev</span>
                  </button>
                  <button className="btn hover:shadow-red-500 bg-red-500 text-white flex items-center">
                    <span>Next</span>
                    <ChevronDoubleRightIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="protest mt-4 text-xl mb-2">Pilih Server Video</div>
                <div className="flex flex-col-reverse gap-6">
                  {dataAnime?.servers?.map((el, i) => (
                    <div className="p-4 shadow-xl shadow-dark/10 text-sm rounded-lg">
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
          </div>
        </>
      )}
    </div>
  )
}

export default VideoPlayer
