import React, { useEffect } from 'react'
import gsap from 'gsap'
import Loading from './components/Loading'
import Navbar from './components/Navbar'
import axios from 'axios'
import Recent from './components/Recent'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Watch from './pages/Watch'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/watch/:slug/:episode" element={<Watch />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
