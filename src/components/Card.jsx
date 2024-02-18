import React from 'react'
import { motion } from 'framer-motion'
import { PlayCircleIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

function Card({ data }) {
  const navigate = useNavigate()
  const { episode, title, slug, cover } = data

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

  const goToDetail = (slug) => {
    navigate(`/anime/${slug}`)
  }

  return (
    <motion.div className="recent-item" whileHover="hover" onClick={() => goToDetail(slug)}>
      <motion.img variants={imgMotion} className="z-1 object-cover" src={cover} alt="cover" />
      {episode && (
        <motion.div variants={hideTextMotion} className="eps-container">
          <motion.p className="truncate-text-2">Eps {episode}</motion.p>
        </motion.div>
      )}
      <motion.div variants={hideTextMotion} className="title-container">
        <motion.p className="truncate-text-2">{title}</motion.p>
      </motion.div>
      <motion.div className="full-hover opacity-0" variants={fullHoverMotion}>
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
  )
}

export default Card
