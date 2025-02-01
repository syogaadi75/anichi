import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FilmIcon, PlayCircleIcon, StarIcon, TvIcon, UsersIcon } from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function PotraitCard({ data, recent }) {
  const navigate = useNavigate()
  const { episode, title, rating, views, sinopsis, jenis, genres, slug, cover, released_on } = data
  const [loading, setLoading] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [showLeft, setShowLeft] = useState(false)
  const cardRef = useRef(null)

  const imgMotion = {
    hover: {
      opacity: 1,
      // scale: 1.1,
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

  const cardDetailMotion = {
    hidden: { opacity: 0, x: 10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, type: 'tween', ease: 'easeOut' }
    }
  }

  const goToDetail = async (slug) => {
    if (recent) {
      setLoading(true)
      try {
        navigate(`/watch/${btoa(slug)}`)
      } catch (error) {
        console.log(error)
      }
    } else {
      navigate(`/anime/${slug}`)
    }
  }

  useEffect(() => {
    if (hovered && cardRef.current) {
      const cardRect = cardRef.current.getBoundingClientRect()
      const windowWidth = window.innerWidth
      setShowLeft(cardRect.right + 390 > windowWidth) // Jika mentok kanan, pindah ke kiri
    }
  }, [hovered])

  // Format number to string with dot separator
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  }

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={cardRef}
      className="w-full max-w-[44vw] lg:max-w-[200px] p-2"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <motion.div className="potrait-card rounded-lg" whileHover="hover" onClick={() => (loading ? console.log('masih loading woi') : goToDetail(slug))}>
        <motion.div className="linear-mask-image">
          <motion.img variants={imgMotion} className="z-1 object-cover w-full h-[30vh] lg:h-64 rounded-lg" src={cover} alt="cover" />
        </motion.div>
        <motion.div variants={hideTextMotion} className="eps-released-container">
          <motion.p className="truncate-text-2 side-badge-container bg-yellow-400 text-dark font-semibold">
            <motion.span className="inline">{rating}</motion.span>
          </motion.p>
          <motion.p className="truncate-text-2 side-badge-container bg-purple-400 text-dark font-semibold">
            <motion.span className="inline">{jenis ? jenis : '-'}</motion.span>
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
            <FilmIcon className="w-12 text-purple-400" />
          </div>
          <div className="font-semibold text-center truncate-text-3">
            <p>{title}</p>
          </div>
          <div></div>
        </motion.div>

        {/* Card Detail yang muncul di samping saat hover */}
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: showLeft ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: showLeft ? 20 : -20 }}
            className={`absolute top-0 ${showLeft ? 'right-[110%]' : 'left-[110%]'} h-64 w-[390px] py-4 px-3 bg-dark/85 backdrop-blur-sm text-white shadow-lg rounded-lg z-50`}
          >
            <h3 className="font-bold mb-4">{title}</h3>
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-2 w-full flex-wrap">
                <StarIcon className="w-5 text-yellow-400" /> <span className="font-semibold">{rating ? rating : '-'}</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <TvIcon className="w-5 text-purple-400" /> <span className="font-semibold">{jenis ? jenis : '-'}</span>
              </div>
              <div className="flex items-center gap-2 w-full">
                <UsersIcon className="w-5 text-secondary" /> <span className="font-semibold">{views ? formatNumber(views) : '-'}</span>
              </div>
            </div>
            <p className="text-xs mb-3">{sinopsis ? sinopsis : '-'}</p>
            <div className="flex flex-wrap gap-2 absolute bottom-2">
              {genres?.map((genre, i) => (
                <div key={i} className="bg-secondary/15 text-secondary text-sm px-2 py-1 rounded-lg protest tracking-wider">
                  {genre.text}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

export default PotraitCard
