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

function updateUser(id, updateUser){
    return axios.post(config.url + '/user/updateUser/' + id, updateUser)
}

function deleteMyAccount(id){
    return axios.post(config.url+'/user/deleteMyAccount/' + id)
}

export default { 
    signin, login, profil, updateUser, deleteMyAccount
 }