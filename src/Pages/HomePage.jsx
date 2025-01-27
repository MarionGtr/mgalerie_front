import { useEffect, useState } from "react";
import StyleService from "../Services/StyleService";
import { useNavigate } from "react-router-dom";
import ArtworkCard from "../Components/ArtworkCard";
import ArtworkService from "../Services/ArtworkService";

const HomePage = () => {
    const [styles, setStyles] = useState([]);
    const [artworkImages, setArtworkImages] = useState([]);
    const navigate = useNavigate();

    const navigateTo = (type, id) => {
        if (type === "style") {
            navigate("/styleByID/" + id);
        } else if (type === "artwork") {
            navigate("/artworkByID/" + id);
        }
    };
    

    const fetchStyle = async () => {
        try {
            const response = await StyleService.allStyle();
            // console.log("Réponse API:", response.data);
            setStyles(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchArtworkImages = async () => {
        try {
            const response = await ArtworkService.getAllImages();
            setArtworkImages(response.data)
            // console.log(response.data);
        } catch (error) {
            console.error('Erreur lors de la récupération des images :', error);
        }
    };


    useEffect(() => {
        fetchStyle();
        fetchArtworkImages();
    }, []);

    return (
        <div className="body-homepage">
            <div className="bloc-courant">
                <h1>Courants artistiques</h1>
                {styles && styles.map((style) => (
                    <h3 key={style.id_style} onClick={() => navigateTo("style", style.id_style)}>
                        {style.style}
                    </h3>
                ))}
            </div>

            <div className="bloc-principal">
               
                    {artworkImages && artworkImages.map((image, index) => (
                        <ArtworkCard 
                        key={index}
                        artwork={image}
                        onClick={() => {
                            // console.log("ID cliqué :", image.id_artwork); 
                            navigate("/artworkByID/" + image.id_artwork);
                        }}
                        />
                    ))}
            </div>
        </div>
    );
};

export default HomePage;