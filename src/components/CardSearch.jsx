import React from 'react'
import { motion } from 'framer-motion'
import { PlayCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

function CardSearch({ data }) {
  const navigate = useNavigate()
  const { title, slug, cover, episode } = data

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
    const encode = btoa(slug)
    navigate(`/anime/${encode}`) 
  }

  return (
    <motion.div>
      <motion.div
        className="recent-item rounded-lg"
        whileHover="hover"
        onClick={() => (goToDetail(slug))}
      >
        <motion.div className="linear-mask-image">
          <motion.img variants={imgMotion} className="z-1 object-cover" src={cover} alt="cover" />
        </motion.div>
        <motion.div variants={hideTextMotion} className="eps-container">
          <motion.p className="truncate-text-2">
            <motion.span className="inline">{episode}</motion.span> 
          </motion.p>
        </motion.div>
        <motion.div variants={hideTextMotion} className="title-container">
          <motion.p className="truncate-text-2">{title}</motion.p>
        </motion.div>
        <motion.div className="full-hover opacity-0" variants={fullHoverMotion}>
          <div>
            <PlayCircleIcon className="w-12 h-12 text-red-400" />
          </div>
          <div className="font-bold border-b-2 border-secondary pb-2 px-4">
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

export default CardSearch
