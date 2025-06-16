import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home';
import Experience from './pages/Experience';
import Services from './pages/Services';

function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/services' element={<Services />} />
      </Routes>
    </div>
  )
}

export default App
