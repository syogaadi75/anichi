import React, { useEffect, useRef, useState } from 'react'
import {
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useNavigate } from 'react-router-dom'
gsap.registerPlugin(ScrollTrigger)

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const searchInput = useRef()
  const navbarMobileRef = useRef(null)
  const navigate = useNavigate()
  useEffect(() => {
    const htmlElement = document.querySelector('html')
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme === 'dark') {
      htmlElement.classList.add('dark')
      setIsDarkMode(true)
    } else {
      htmlElement.classList.remove('dark')
      setIsDarkMode(false)
    }

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
        backgroundColor: isDarkMode ? '#06030A' : '#FFFBEC',
        height: 65,
        duration: 0.3
      })
    } else {
      gsap.to('#navbar', {
        boxShadow: 'none',
        backgroundColor: 'rgba(0,0,0,0)',
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

  const toggleMobileNavbar = () => {
    const navbarMobile = navbarMobileRef.current
    navbarMobile.classList.remove('hidden')
    gsap.to(navbarMobile, { opacity: 1, x: 0, duration: 0.5, display: 'block', ease: 'power3.out' })
  }

  const closeMobileNavbar = () => {
    const navbarMobile = navbarMobileRef.current
    gsap.to(navbarMobile, {
      opacity: 0,
      x: 20,
      duration: 0.5,
      ease: 'power3.out',
      onComplete: () => {
        navbarMobile.classList.add('hidden')
        navbarMobile.style.display = 'none'
      }
    })
  }

  const changePage = (path) => {
    closeMobileNavbar()
    navigate(path)
  }

  const toggleDarkMode = () => {
    const htmlElement = document.querySelector('html')
    setIsDarkMode(!isDarkMode)
    if (!isDarkMode) {
      htmlElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      htmlElement.classList.remove('dark')
      localStorage.setItem('theme', 'ligth')
    }
  }

  return (
    <>
      <div className="navbar" id="navbar">
        <h2 className="nav-title" id="nav-title" onClick={() => navigate('/')}>
          Ani<span className="text-secondary">`</span>chi
        </h2>
        <div className="nav-container">
          <div className="nav-item-container">
            <div className="nav-items group">
              <a href="javascript:;" className="nav-item" onClick={() => navigate('/')}>
                Home
              </a>
            </div>
            <div className="nav-items group">
              <a href="javascript:;" className="nav-item" onClick={() => navigate('/ongoing')}>
                Ongoing Anime
              </a>
            </div>
            <div className="nav-items group">
              <a href="javascript:;" className="nav-item" onClick={() => navigate('/completed')}>
                Completed Anime
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
                className="w-4 h-4 text-secondary dark:text-light dark:group-hover:text-dark group-hover:text-light"
                strokeWidth={4}
              />
            </button>
          </div>
          <div className="flex items-center">
            <button className="btn-hamburger" onClick={toggleDarkMode}>
              {isDarkMode ? (
                <SunIcon className="w-6 h-6 text-ligth" />
              ) : (
                <MoonIcon className="w-6 h-6 text-ligth" />
              )}
            </button>
          </div>
          <div className="nav-hamburger">
            <button className="btn-hamburger" onClick={toggleMobileNavbar}>
              <Bars3Icon className="w-8 h-8 text-secondary" />
            </button>
          </div>
        </div>
      </div>
      <div className="navbar-mobile opacity-0 hidden translate-x-20" ref={navbarMobileRef}>
        <div className="pr-4 py-2 flex justify-end">
          <button onClick={closeMobileNavbar}>
            <XMarkIcon className="w-8 text-secondary" strokeWidth={2} />
          </button>
        </div>
        <h2 className="nav-title text-center" id="nav-title" onClick={() => navigate('/')}>
          Ani<span className="text-secondary">`</span>chi
        </h2>
        <div className="flex flex-col px-8 mt-8 protest text-xl gap-5">
          <a
            href="javascript:;"
            className="py-2 w-full text-left text-secondary bg-secondary/5 dark:bg-white/10 rounded dark:text-light px-3 cursor-pointer"
            onClick={() => changePage('/')}
          >
            Home
          </a>
          <a
            href="javascript:;"
            className="py-2 w-full text-left text-secondary bg-secondary/5 dark:bg-white/10 rounded dark:text-light px-3 cursor-pointer"
            onClick={() => changePage('/ongoing')}
          >
            Ongoing Anime
          </a>
          <a
            href="javascript:;"
            className="py-2 w-full text-left text-secondary bg-secondary/5 dark:bg-white/10 rounded dark:text-light px-3 cursor-pointer"
            onClick={() => changePage('/completed')}
          >
            Completed Anime
          </a>
        </div>
      </div>
    </>
  )
}

export default Navbar
