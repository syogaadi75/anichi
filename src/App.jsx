import React, { useEffect } from 'react'
import gsap from 'gsap'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import axios from 'axios'
import Recent from './components/Recent'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Watch from './pages/Watch'
import Home from './pages/Home'
import Detail from './pages/Detail'
import Search from './pages/Search'
import Ongoing from './pages/Ongoing'
import Completed from './pages/Completed'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<Search />} />
        <Route path="/watch/:slug" element={<Watch />} />
        <Route path="/anime/:slug" element={<Detail />} />
        <Route path="/ongoing" element={<Ongoing />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
