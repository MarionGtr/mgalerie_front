import axios from "axios"
import config from "../config/url"

function getAllImages() {
    return axios.get(config.url+ "/artwork/allArtwork")
}

function getArtworkByID(id) {
    return axios.get(config.url+ "/artwork/artworkByID/" + id)
}

export default {
    getAllImages, getArtworkByID
}