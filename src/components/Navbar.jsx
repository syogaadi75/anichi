import React, { useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon, Bars3Icon } from '@heroicons/react/24/outline'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const searchInput = useRef()
  const navigate = useNavigate()
  useEffect(() => {
    gsap.to('#navbar', { duration: 0.5, y: 40, opacity: 1, delay: 0.5 })
    gsap.to('#nav-title', { duration: 0.5, y: 2, opacity: 1, delay: 1 })

    ScrollTrigger.create({
      trigger: '#navbar',
      start: 'top -100',
      endTrigger: 'body',
      end: 'top top',
      onUpdate: (self) => {
        if (self.direction === 1) {
          // Scrolling down
          setScrolled(true)
        } else {
          // Scrolling up
          setScrolled(false)
        }
      }
    })
  }, [])

  useEffect(() => {
    if (scrolled) {
      gsap.to('#navbar', {
        boxShadow: '0px 5px 20px 0px rgba(6,3,10,.3)',
        backgroundColor: '#F9F1D5',
        height: 65,
        duration: 0.3
      })
    } else {
      gsap.to('#navbar', {
        boxShadow: 'none',
        backgroundColor: 'rgba(249, 241, 213, .6)',
        height: 60,
        duration: 0.3
      })
    }
  }, [scrolled])

  const searchAnime = () => {
    const title = searchInput.current.value
    const replace = title.replace(' ', '+')
    navigate('/search?t=' + replace)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchAnime()
    }
  }

  return (
    <div className="navbar bg-blue-500" id="navbar">
      <h2 className="nav-title" id="nav-title" onClick={() => navigate('/')}>
        Ani<span className="text-red-500">`</span>chi
      </h2>
      <div className="nav-container">
        <div className="nav-item-container">
          <div className="nav-items group">
            <a href="javascript:;" className="nav-item">
              Home
            </a>
          </div>
          <div className="nav-items group">
            <a href="javascript:;" className="nav-item">
              Anime List
            </a>
          </div>
          <div className="nav-items group">
            <a href="javascript:;" className="nav-item">
              Genre
            </a>
          </div>
        </div>
        <div className="nav-search">
          <input
            ref={searchInput}
            className="search-input"
            type="text"
            placeholder="Search"
            onKeyDown={handleKeyPress}
          />
          <button className="btn-search group" onClick={searchAnime}>
            <MagnifyingGlassIcon
              className="w-4 h-4 text-primary group-hover:text-light"
              strokeWidth={4}
            />
          </button>
        </div>
        <div className="nav-hamburger">
          <button className="btn-hamburger">
            <Bars3Icon className="w-8 h-8 text-red-500" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
