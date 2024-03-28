import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home.tsx'
import SignupPage from './pages/signup.tsx'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path='/Signup' element={<SignupPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
