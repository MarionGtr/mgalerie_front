import { useEffect, useState } from "react";
import StyleService from "../Services/StyleService";
import { useNavigate } from "react-router-dom";
import ArtworkCard from "../Components/ArtworkCard";
import ArtworkService from "../services/ArtworkService";

const HomePage = () => {
  const [styles, setStyles] = useState([]);
  const [artworkImages, setArtworkImages] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 428);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 428);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    
    const fetchStyle = async () => {
      try {
        const response = await StyleService.allStyle();
        setStyles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchArtworkImages = async () => {
      try {
        const response = await ArtworkService.getAllImages();
        setArtworkImages(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des images :", error);
      }
    };

    fetchStyle();
    fetchArtworkImages();
  }, []);

  return (
    <div className="body-homepage">
      {!isMobile && (
        <div className="bloc-courant">
          <h1>Courants artistiques</h1>
          {styles.map((style) => (
            <h3 key={style.id_style} onClick={() => navigate(`/styleByID/${style.id_style}`)}>
              {style.style}
            </h3>
          ))}
        </div>
      )}

      <div className="bloc-principal">
        {artworkImages.map((image, index) => (
          <ArtworkCard
            key={index}
            artwork={image}
            onClick={() => navigate(`/artworkByID/${image.id_artwork}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;