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

function getMailUser() {
    const token = localStorage.getItem("token");
    if (token && isValid()) {
        const decodedToken = jwtDecode(token);
        const user = {
            email: decodedToken.email,
            id: decodedToken.id,
            role: decodedToken.role

        };
        localStorage.setItem("user", JSON.stringify(user)); // Stocke l'utilisateur connecté
        return user;
    } else {
        return {};
    }
}


function isValid() {
    const token = localStorage.getItem('token')
    if (token) {
        const decodedToken = jwtDecode(token)
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

function logout() {
    delete axios.defaults.headers["Authorization"];
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // Supprime l'utilisateur connecté
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("likedArtworks_")) {
            localStorage.removeItem(key);
        }
    });
}


function getRoleUser() {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le JWT
        return payload.role || "user"; 
    } catch (error) {
        return "user"; 
    }
}


export default { isValid, setToken, getMailUser, logout, getRoleUser }