import axios from "axios"
import config from "../config/url"

function getArtworkByStyle(id) {
    return axios.get(config.url+'/posseder/ArtworkStyle/' + id )
}


export default{
    getArtworkByStyle
}