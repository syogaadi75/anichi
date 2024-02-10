import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { ChevronDoubleRightIcon, PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

function Recent() {
  const navigate = useNavigate()
  const [recents, setRecents] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const loadData = async () => {
    try {
      const res = await axios.get('https://anichi-api.vercel.app/fserver/recent')
      setRecents(res.data.list)
      setIsLoading(false)
      console.log(res.data.list)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const imgMotion = {
    hover: {
      opacity: 1,
      scale: 1.1,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeOut'
      }
    }
  }

  const hideTextMotion = {
    hover: {
      opacity: 0,
      y: 10,
      transition: {
        duration: 0.3,
        type: 'tween',
        ease: 'easeOut'
      }
    }
  }

  const fullHoverMotion = {
    hover: {
      opacity: 1,
      transition: {
        duration: 0.3,
        delay: 0.2,
        type: 'tween',
        ease: 'easeOut'
      }
    }
  }

  const goToWatch = (slug, episode) => {
    navigate(`/watch/${slug}/${episode}`)
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
              <motion.div
                className="recent-item"
                whileHover="hover"
                onClick={() => goToWatch(el.slug, el.episode)}
              >
                <motion.img variants={imgMotion} className="z-1" src={el.cover} alt="cover" />
                <motion.div variants={hideTextMotion} className="eps-container">
                  <motion.p className="truncate-text-2">Eps {el.episode}</motion.p>
                </motion.div>
                <motion.div variants={hideTextMotion} className="title-container">
                  <motion.p className="truncate-text-2">{el.title}</motion.p>
                </motion.div>
                <motion.div className="full-hover opacity-0" variants={fullHoverMotion}>
                  <div>
                    <PlayCircleIcon className="w-12 h-12 text-red-400" />
                  </div>
                  <div className="font-bold border-b-2 border-red-500 pb-2 px-4">
                    <p>Episode {el.episode}</p>
                  </div>
                  <div className="font-semibold text-center truncate-text-3">
                    <p>{el.title}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button className="btn bg-red-500 text-light hover:shadow-red-500/50 ">
              <div>See Others</div>
              <ChevronDoubleRightIcon className="w-5 h-5" />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Recent
