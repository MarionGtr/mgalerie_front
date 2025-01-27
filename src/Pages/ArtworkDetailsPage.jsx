import { useEffect, useState } from "react"
import ArtworkService from "../Services/ArtworkService"
import { useParams } from "react-router-dom"
import config from "../config/url"

const ArtworkDetailsPage = () => {

    const { id } = useParams()
    const [artwork, setArtwork] = useState({})


    const fetchArtworkByID = async () => {
        try {
            const response = await ArtworkService.getArtworkByID(id)
            console.log(response.data)
            setArtwork(response.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchArtworkByID()
    }, [])



    return <>
        <div className="body-details">

            <div className="details-gauche">
                <div className="art-title">
                    <h1>{artwork.title}</h1>
                </div>
                <div className="art-artist">
                    <h2>{artwork.artist}</h2>
                </div>
                <div className="art-description">
                    <h3>{artwork.description}</h3>
                </div>
                <div className="art-size">
                    <h3>Dimensions : {artwork.size}</h3>
                </div>
                <div className="art-creation_date">
                    <h3>Crée en {artwork.creation_date}</h3>
                </div>
            </div>

            <div className="details-droite">
                <img className="card-img" src={config.url + "/images/" + artwork.image_url} alt={artwork.title} />
            </div>
        </div>

    </>

}
export default ArtworkDetailsPage