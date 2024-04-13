import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home.tsx'
import SignupPage from './pages/signup.tsx'
import Chart from './pages/chart.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/Signup' element={<SignupPage/>}/>
        <Route path='chart' element={<Chart/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
