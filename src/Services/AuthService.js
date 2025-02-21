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
        console.log(decodedToken)
        if (decodedToken.exp * 1000 < new Date().getTime()) {
            logout()
            return false
        } else {
            setToken()
        } return true
        //vérifie si le token est valide
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
        console.log("Aucun token trouvé");
        return null;
    }

    try {
        const payload = JSON.parse(atob(token.split(".")[1])); // Décoder le JWT
        console.log("Payload du token:", payload); // Vérification
        return payload.role || "user"; 
    } catch (error) {
        console.error("Erreur lors du décodage du token:", error);
        return "user"; 
    }
}


export default { isValid, setToken, getMailUser, logout, getRoleUser }