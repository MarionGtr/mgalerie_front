import axios from "axios"
import config from "../config/url"

function getAllImages() {
    return axios.get(config.url+ "/artwork/allArtwork")
}

function getArtworkByID(id) {
    return axios.get(config.url+ "/artwork/artworkByID/" + id)
}

function addArtwork(artworkData) {
    return axios.post(config.url + "/artwork/addArtwork", artworkData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

function updateArtwork(id, artworkData) {
    return axios.post(config.url + "/artwork/updateArtwork/" + id, artworkData, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

function deleteArtwork(id) {
    return axios.delete(config.url + "/artwork/deleteArtwork/" + id, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
}

export default {
    getAllImages, getArtworkByID, addArtwork, updateArtwork, deleteArtwork
}