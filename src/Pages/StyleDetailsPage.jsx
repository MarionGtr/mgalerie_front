import { useEffect, useState } from "react";
import StyleService from "../Services/StyleService";
import { useParams } from "react-router-dom";
import PossederService from "../Services/PossederService";
import ArtworkCard from "../Components/ArtworkCard";
import ArtworkService from "../Services/ArtworkService";

const StyleDetails = () => {

    const { id } = useParams();
    const [style, setStyle] = useState([])
    const [byStyle, setByStyle] = useState([])
    const [artworkImages, setArtworkImages] = useState([])

    const fetchStyleByID = async () => {
        try {
            const response = await StyleService.StyleByID(id)
            // console.log("API:", response)
            setStyle(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchArtworkByStyle = async () => {
        try {
            const response = await PossederService.getArtworkByStyle(id)
            // console.log("API:", response)
            setByStyle(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchArtworkImages = async () => {
        try {
            const response = await ArtworkService.getAllImages();
            // console.log(response.data);
            setArtworkImages(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des images :', error);
        }
    };


    useEffect(() => {
        fetchStyleByID(),
            fetchArtworkByStyle()
        fetchArtworkImages()
    }, [])

    return <>
        <div>
            <h1>{style.style}</h1>
            <h3>{style.style_description}</h3>
            <h3>Période : {style.period}</h3>
        </div>
        <div>
            {byStyle && byStyle.map((image, index) => (
                <ArtworkCard key={index} artwork={image} />
            ))}
        </div>
    </>
}

export default StyleDetails;