import axios from "axios";
import config from "../config/url";

function addComment(id_artwork, content, id_user) {
    return axios.post(config.url + "/comment/addComment", { id_artwork, content, id_user },{
    headers: {
        'Content-Type': 'application/json'
    }
})};

function getComments(id_artwork) {
    return axios.get(`${config.url}/comment/getComments/${id_artwork}`);
}

function getUsersComments(id_user) {
    return axios.get(`${config.url}/comment/getUserComments/${id_user}`); 
}


export default {
    addComment, getComments, getUsersComments
};
