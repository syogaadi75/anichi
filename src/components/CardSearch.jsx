import React from 'react'
import { motion } from 'framer-motion'
import { PlayCircleIcon, StarIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'

function CardSearch({ data }) {
  const navigate = useNavigate()
  const { title, slug, cover, genres, rating, status } = data

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
    <motion.div>
      <motion.div className="flex items-center text-xs">
        <motion.div
          className={`bg-primary dark:bg-light py-1 px-2 lg:py-2 lg:px-3 rounded-tl-md lg:rounded-tl-lg flex items-center font-semibold text-yellow-500`}
        >
          <StarIcon className="w-4 mr-1" />
          <span>{rating}</span>
        </motion.div>
        <motion.div className="text-primary py-1 px-2 lg:py-2 lg:px-3 bg-primary/10 dark:bg-light/10 dark:text-light rounded-tr-md lg:rounded-tr-lg w-full">
          {status}
        </motion.div>
      </motion.div>
      <motion.div className="recent-item" whileHover="hover" onClick={() => goToDetail(slug)}>
        <motion.img
          variants={imgMotion}
          className="z-1 object-cover two-linear-mask-image"
          src={cover}
          alt="cover"
        />
        <motion.div variants={hideTextMotion} className="title-container">
          <motion.p className="truncate-text-2">{title}</motion.p>
        </motion.div>
        <motion.div className="full-hover opacity-0" variants={fullHoverMotion}>
          <div>
            <PlayCircleIcon className="w-12 h-12 text-red-400" />
          </div>
          <div className="font-semibold text-center truncate-text-3">
            <p>{title}</p>
          </div>
        </motion.div>
      </motion.div>
      <motion.div className="flex items-center text-xs">
        <motion.div className="text-primary dark:text-secondary h-[2.42rem] lg:h-[2.7rem] py-1 px-2 lg:py-2 lg:px-3  rounded-b-md lg:rounded-b-lg w-[150px] lg:w-[220px] capitalize flex flex-wrap gap-2 truncate-text-2">
          {genres?.map((genre, i) => (
            <motion.span className="font-semibold">
              {genre.text}
              {i === genres.length - 1 ? '' : ' , '}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default CardSearch
