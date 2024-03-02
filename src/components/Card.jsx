import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Card({ data, recent }) {
  const navigate = useNavigate()
  const { episode, title, slug, cover, date, day } = data
  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
  const isDay = days.includes(day)
  const [loading, setLoading] = useState(false)

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

  const goToDetail = async (slug) => {
    if (recent) {
      setLoading(true)
      try {
        const epsData = await axios.get(
          'https://anichi-api.vercel.app/tserver/slug-last-eps/' + slug
        )
        const epsSlug = epsData.data.episode.last.slug
        if (epsSlug) {
          navigate(`/watch/${epsSlug}`)
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate(`/anime/${slug}`)
    }
  }

  return (
    <motion.div>
      <motion.div className="flex items-center text-xs">
        <motion.div
          className={`bg-primary py-1 px-2 lg:py-2 lg:px-3 rounded-tl-md lg:rounded-tl-lg flex items-center ${
            isDay ? 'text-white' : 'text-yellow-400'
          }`}
        >
          {!isDay && <StarIcon className="w-4 mr-1" />}
          <motion.span>{day}</motion.span>
        </motion.div>
        <motion.div className="text-primary py-1 px-2 lg:py-2 lg:px-3 bg-primary/10 rounded-tr-md lg:rounded-tr-lg w-full">
          {date}
        </motion.div>
      </motion.div>
      <motion.div
        className="recent-item rounded-lg rounded-t-none"
        whileHover="hover"
        onClick={() => (loading ? console.log('masih loading woi') : goToDetail(slug, episode))}
      >
        <motion.img variants={imgMotion} className="z-1 object-cover" src={cover} alt="cover" />
        {episode && (
          <motion.div variants={hideTextMotion} className="eps-container">
            <motion.p className="truncate-text-2">Eps {episode}</motion.p>
          </motion.div>
        )}
        <motion.div variants={hideTextMotion} className="title-container">
          <motion.p className="truncate-text-2">{title}</motion.p>
        </motion.div>
        {loading ? (
          <motion.div className="full-hover opacity-100">
            <div className="w-full absolute backdrop-blur-sm">
              <div className="flex flex-col justify-center items-center h-screen ">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-red-500"></div>
                <div className="takota text-xl mt-2 text-light tracking-wider">
                  Memuat <span className="text-red-500 pl-2">`</span> Data
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          ''
        )}
        <motion.div className="full-hover opacity-0" variants={loading ? {} : fullHoverMotion}>
          <div>
            <PlayCircleIcon className="w-12 h-12 text-red-400" />
          </div>
          <div className="font-bold border-b-2 border-red-500 pb-2 px-4">
            <p>Episode {episode}</p>
          </div>
          <div className="font-semibold text-center truncate-text-3">
            <p>{title}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default Card
