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
            console.log("API:", response)
            setStyle(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    const fetchArtworkByStyle = async () => {
        try {
            const response = await PossederService.getArtworkByStyle(id)
            console.log("API:", response)
            setByStyle(response.data)
        } catch (error) {
            console.log(error);
        }
    }

    const fetchArtworkImages = async () => {
        try {
            const response = await ArtworkService.getAllImages();
            setArtworkImages(response.data);
            console.log(response.data.images);

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
        <h1>page détails courants artistiques</h1>

        <h1>{style.style}</h1>
        <p>{style.style_description}</p>
        <p>Période : {style.period}</p>

        {byStyle && byStyle.map((image, index) => (
            <ArtworkCard key={index} artwork={image} />
        ))}
    </>
}

export default StyleDetails;