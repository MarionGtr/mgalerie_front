import axios from "axios"
import config from "../config/url"

function allStyle() {
    return axios.get(config.url+'/style/allStyle',{

    })
}

export default{
    allStyle
}