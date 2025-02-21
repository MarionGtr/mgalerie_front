import axios from "axios";
import config from "../config/url";

function addComment(id_artwork, content, id_user) {
    return axios.post(config.url + "/comment/addComment", { id_artwork, content, id_user }, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
};

function getComments(id_artwork) {
    return axios.get(`${config.url}/comment/getComments/${id_artwork}`);
}

function getUsersComments(id_user) {
    return axios.get(`${config.url}/comment/getUserComments/${id_user}`);
}

function deleteComment(id_comment, id_artwork) {
    console.log("Suppression du commentaire avec ID :", id_comment, "et ID de l'œuvre :", id_artwork); // Ajouter cette ligne
    return axios.post(config.url + "/comment/deleteComment/" + id_comment, {
        id_artwork
    });
}

export default {
    addComment, getComments, getUsersComments, deleteComment
};
