import axios from 'axios'
import { jwtDecode } from 'jwt-decode'

function setToken(){
    const token = localStorage.getItem('token')
    if (token) {
        axios.defaults.headers["Authorization"] = "Bearer " + token
    } else {
        delete axios.defaults.headers["Authorization"]
    }
}

function getMailUser(){
    const token = localStorage.getItem('token')
    if(token && isValid){
        const decodedToken = jwtDecode(token)
        return  {
            email : decodedToken.email
        }
    }else{
        return {}
    }
}

function isValid() {
    const token = localStorage.getItem('token')
    if (token) {
        const decodedToken = jwtDecode(token)
        console.log(decodedToken)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout()
            return false
        } else {
            setToken()
        } return true
    } else {
        logout()
        return false
    }
}

function logout(){
    delete axios.defaults.headers['Authorization']
    localStorage.removeItem('token')
}

export default { isValid, setToken, getMailUser, logout }