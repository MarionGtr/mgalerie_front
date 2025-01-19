import axios from 'axios'
import config from '../config/url'

function signin(user) {
    return axios.post(config.url+'/user/signin', user)
    
}

function login(user) {
    return axios.post(config.url+'/user/login', user)
    
}

function profil() {
    return axios.get(config.url+'/user/profil')
    
}

export default { 
    signin, login, profil
 }