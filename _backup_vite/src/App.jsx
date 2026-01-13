import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Background3D from './components/Background3D'
import LandingPage from './pages/LandingPage'
import AdminDashboard from './pages/AdminDashboard'
import AboutPage from './pages/AboutPage'
import ServicesPage from './pages/ServicesPage'
import PortfolioPage from './pages/PortfolioPage'
import ReferencesPage from './pages/ReferencesPage'
import PackagesPage from './pages/PackagesPage'
import ContactPage from './pages/ContactPage'
import Navbar from './components/Navbar'
import CustomCursor from './components/CustomCursor'

function App() {
  return (
    <Router>
      <div className="relative min-h-screen bg-background">
        <CustomCursor />
        <Background3D />
        <Navbar />

        <main className="relative z-10 w-full overflow-hidden">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/hakkimizda" element={<AboutPage />} />
              <Route path="/hizmetler" element={<ServicesPage />} />
              <Route path="/portfolyo" element={<PortfolioPage />} />
              <Route path="/referanslar" element={<ReferencesPage />} />
              <Route path="/paketler" element={<PackagesPage />} />
              <Route path="/iletisim" element={<ContactPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </AnimatePresence>
        </main>

        {/* Dekoratif noise dokusu */}
        <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>
      </div>
    </Router>
  )
}

export default App
