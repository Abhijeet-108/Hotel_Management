import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Experience from './pages/Experience';
import Services from './pages/Services';
import LoginPage from './pages/Login';
import BookingContent from './components/content/BookingContent';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/services' element={<Services />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/property/:id" element={<BookingContent />} />
      </Routes>
    </div>
  )
}

export default App
