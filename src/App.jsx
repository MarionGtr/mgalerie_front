import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SigninPage from './Pages/SigninPage'
import LoginPage from './Pages/LoginPage'
import ProfilPage from './Pages/ProfilPage'
import AuthContext from './Context/AuthContext'

function App() {
const [isAuthentificated, setIsAuthentificated] = useState(AuthService.isValid())
const [user, setUser] = useState({})

  return (
    <BrowserRouter>
    <AuthContext.Provider value ={{isAuthentificated, setIsAuthentificated, user, setUser}}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/signin" element={<SigninPage/>} />
        <Route path="/profil" element={<ProfilPage/>} />
      </Routes>
     {/* <Footer/> */}
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
