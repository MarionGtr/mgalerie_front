import axios from "axios"
import config from "../config/url"

function getLikes() {
    return axios.get(config.url+ "/like/liked")
}

function addLike(id_artwork) {
    return axios.post(config.url+ "/like/addLike", {id_artwork})

}
export default {
    getLikes, addLike
}