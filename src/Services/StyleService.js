import axios from "axios"
import config from "../config/url"

function allStyle() {
    return axios.get(config.url+'/style/allStyle')
}

function StyleByID(id) {
    return axios.get(config.url+'/style/styleByID/'+ id)

}

export default{
    allStyle, StyleByID
}