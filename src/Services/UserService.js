import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/json';
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

function allUsers() {
    return axios.get(config.url+'/user/allUsers')
}

function updateUser(id, updateUser){
    return axios.post(config.url + '/user/updateUser/' + id, updateUser)
}

function deleteMyAccount(id){
    return axios.post(config.url+'/user/deleteMyAccount/' + id)
}

function SendCode(data){
    return axios.post(config.url + '/user/sendCode', data)
}

function ResetPassword(data){
    return axios.post(config.url+ '/user/resetPassword', data)
}


export default { 
    signin, login, profil, allUsers, updateUser, deleteMyAccount, SendCode, ResetPassword
 }