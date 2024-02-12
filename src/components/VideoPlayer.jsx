import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, ChevronDoubleLeftIcon } from '@heroicons/react/24/solid'
import { useNavigate, useParams } from 'react-router-dom'

function VideoPlayer() {
  let { slug, episode } = useParams()
  const iframeRef = useRef(null)
  const navigate = useNavigate()
  const [dataAnime, setDataAnime] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const loadData = async () => {
    setIsLoading(true)
    setIframeLoaded(false)
    try {
      const res = await axios.get('https://anichi-api.vercel.app/fserver/get-video', {
        params: {
          slug,
          episode
        }
      })
      setDataAnime(res.data)
      setIsLoading(false)
      console.log(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    loadData()
  }, [slug, episode])

  const goToWatch = (slug, episode) => {
    navigate(`/watch/${slug}/${episode}`)
  }

  // const changeServer = (server) => {
  //   setIframeLoaded(false)
  //   const iframe = iframeRef.current
  //   if (iframe) {
  //     iframe.src = server
  //   }
  // }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
  }

  return (
    <div className="section" id="recent">
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          <div className="protest text-xl mb-4">
            <span className="pr-4 pb-2">{dataAnime.title}</span>
          </div>
          <div>
            {/* <div className="server-container mb-2">
              <div className="server-item text">Pilih Server</div>
              {dataAnime.serverVideo.map((val, i) => (
                <div
                  onClick={() => changeServer(val.value)}
                  className={`server-item ${i === 0 ? 'active' : ''}`}
                >
                  {val.text}
                </div>
              ))}
            </div> */}
            {!iframeLoaded && <div>Loading...</div>}
            <div className="flex w-full h-[500px]" id="iframe-container">
              <iframe
                id="iframe-video"
                className="w-full h-full"
                src={dataAnime.link}
                onLoad={handleIframeLoad}
                ref={iframeRef}
                allowFullScreen
              ></iframe>
            </div>
            <div className="flex justify-end gap-4 mt-4">
              <div>
                {dataAnime.navigation.prev ? (
                  <button
                    onClick={() => goToWatch(slug, Number(episode) - 1)}
                    className="btn bg-red-500 text-white hover:shadow-red-500"
                  >
                    <ChevronDoubleLeftIcon className="w-5 h-5 text-white" />
                    <span>Prev</span>
                  </button>
                ) : (
                  <button className="btn border-2 border-red-500 text-red-500 hover:shadow-red-500">
                    <ChevronDoubleLeftIcon className="w-5 h-5 text-red-500" />
                    <span>Prev</span>
                  </button>
                )}
              </div>
              <div>
                {dataAnime.navigation.next ? (
                  <button
                    onClick={() => goToWatch(slug, Number(episode) + 1)}
                    className="btn bg-red-500 text-white hover:shadow-red-500"
                  >
                    <span>Next</span>
                    <ChevronDoubleRightIcon className="w-5 h-5 text-white" />
                  </button>
                ) : (
                  <button
                    className="btn border-2 border-red-500 text-red-500 cursor-not-allowed"
                    disabled
                  >
                    <span>Next</span>
                    <ChevronDoubleRightIcon className="w-5 h-5 text-red-500" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoPlayer
