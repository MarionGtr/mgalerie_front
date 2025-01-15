import axios from 'axios'

function signin(user) {
    return axios.post('http://localhost:3001/user/signin', user)
    
}

function login(user) {
    return axios.post('http://localhost:3001/user/login', user)
    
}

// function profil(user) {
//     return axios.post('http://localhost:3001/user/', user)
    
// }

export default { 
    signin, login
 }