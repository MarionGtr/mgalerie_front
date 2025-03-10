import { useEffect, useState } from "react";
import StyleService from "../Services/StyleService";
import { useNavigate, useParams } from "react-router-dom";
import PossederService from "../Services/PossederService";
import ArtworkCard from "../Components/ArtworkCard";
import ArtworkService from "../Services/ArtworkService";

const StyleDetails = () => {
    const { id } = useParams();
    const [style, setStyle] = useState([]);
    const [byStyle, setByStyle] = useState([]);
    const [artworkImages, setArtworkImages] = useState([]);
    const navigate = useNavigate();

    const fetchStyleByID = async () => {
        try {
            const response = await StyleService.StyleByID(id);
            setStyle(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchArtworkByStyle = async () => {
        try {
            const response = await PossederService.getArtworkByStyle(id);
            setByStyle(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchArtworkImages = async () => {
        try {
            const response = await ArtworkService.getAllImages();
            setArtworkImages(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des images :', error);
        }
    };

    // Add dependency on id parameter to reload data when it changes
    useEffect(() => {
        fetchStyleByID();
        fetchArtworkByStyle();
        fetchArtworkImages();
    }, [id]);  // This ensures the component updates when the id parameter changes

    return (
        <div className="bloc-style-details">
            <div className="style-details">
                <h1>{style.style}</h1>
                <h3>{style.style_description}</h3>
                <h3>Période : {style.period}</h3>
            </div>
            <div className="artwork-by-style">
                {byStyle && byStyle.map((image, index) => (
                    <ArtworkCard
                        className="style-img"
                        key={index} 
                        artwork={image} 
                        onClick={() => navigate("/artworkByID/" + image.id_artwork)}
                    />
                ))}
            </div>
        </div>
    );
};

export default StyleDetails;