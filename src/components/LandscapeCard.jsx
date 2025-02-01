import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function LandscapeCard({ data, recent }) {
  const navigate = useNavigate()
  const { episode, title, slug, cover, released_on } = data
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
        navigate(`/watch/${slug}`)
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate(`/anime/${slug}`)
    }
  }

  return (
    <motion.div className="w-full max-w-[175px] lg:max-w-[300px] p-2">
      <motion.div className="landscape-card rounded-lg" whileHover="hover" onClick={() => (loading ? console.log('masih loading woi') : goToDetail(slug))}>
        <motion.div className="linear-mask-image">
          <motion.img variants={imgMotion} className="z-1 object-cover w-full h-36" src={cover} alt="cover" />
        </motion.div>
        <motion.div variants={hideTextMotion} className="eps-released-container">
          <motion.p className="truncate-text-2 eps-container">
            <motion.span className="inline">
              <span className="hidden lg:inline">Ep</span> {episode}
            </motion.span>
          </motion.p>
          <motion.p className="truncate-text-2 released-container">
            <motion.span className="inline">{released_on} ago</motion.span>
          </motion.p>
        </motion.div>
        <motion.div variants={hideTextMotion} className="title-container">
          <motion.p className="truncate-text-2">{title}</motion.p>
        </motion.div>
        {loading ? (
          <motion.div className="full-hover opacity-100">
            <div className="w-full absolute backdrop-blur-sm">
              <div className="flex flex-col justify-center items-center h-full">
                <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-secondary"></div>
                <div className="takota text-xl mt-2 text-light tracking-wider">Memuat Data</div>
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
          <div className="font-semibold text-center truncate-text-3">
            <p>
              {title} Episode {episode}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default LandscapeCard
