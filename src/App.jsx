import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import SigninPage from './Pages/SigninPage'
import LoginPage from './Pages/LoginPage'
import ProfilPage from './Pages/ProfilPage'
import StyleDetailsPage from './Pages/StyleDetailsPage'
import ArtworkDetailsPage from './Pages/ArtworkDetailsPage'
import AuthContext from './Context/AuthContext'
import AuthService from './Services/AuthService'
import Navbar from './Components/Navbar'
import RouteSecu from './Components/RouteSecu'
import Footer from './Components/Footer'
import UserPage from './Pages/UserPage'
import ResetPassword from './Pages/resetPassword'
import SendCode from './Pages/sendCode'



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthService.isValid())
  const [user, setUser] = useState(AuthService.getMailUser())

  return (
 
  
    <BrowserRouter>
      <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <Navbar />
        <Routes> 
          <Route path="/" element={<HomePage />} />
          <Route path="/artworkByID/:id" element={<ArtworkDetailsPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/styleByID/:id" element={<StyleDetailsPage />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/sendCode" element={<SendCode />} />

          <Route element={<RouteSecu />}>
          <Route path="/profil" element={<ProfilPage />} />
          <Route path="/user" element={<UserPage />} />


          </Route>
        </Routes>
        <Footer/>
      </AuthContext.Provider>
    </BrowserRouter>
  )
}

export default App
