import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SigninPage from './Pages/SigninPage'
import LoginPage from './Pages/LoginPage'
import ProfilPage from './Pages/ProfilPage'
import AuthContext from './Context/AuthContext'
import AuthService from './Services/AuthService'
import Navbar from './Components/Navbar'
import RouteSecu from './Components/RouteSecu'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isValid())
  const [user, setUser] = useState(AuthService.getMailUser())

  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route element={<RouteSecu />}>
          <Route path="/profil" element={<ProfilPage />} />
          </Route>
        </Routes>
        {/* <Footer/> */}
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
