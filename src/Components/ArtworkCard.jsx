import config from "../config/url";
import Card from "react-bootstrap/Card";
import React, { useState, useContext, useEffect } from "react";
import { Heart } from "lucide-react";
import AuthContext from "../Context/AuthContext";
import LikeService from "../Services/LikeService"; 

function ArtworkCard({ artwork, onClick }) {
    const { isAuthenticated } = useContext(AuthContext); 
    const [liked, setLiked] = useState(false);

    const fetchLikedArtworks = async () => {
        const user = JSON.parse(localStorage.getItem("user")); // Récupérer l'utilisateur connecté
        if (!user) return;
    
        try {
            const response = await LikeService.getLikes(); // Récupérer les likes depuis le serveur
            if (response.status === 200) {
                const likedArtworks = response.data.map((item) => item.id_artwork);
                localStorage.setItem("likedArtworks_" + user.id, JSON.stringify(likedArtworks));
                setLiked(likedArtworks.includes(artwork.id_artwork));
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des likes:", error);
        }
    };


    const handleLikeClick = async (e) => {
        e.stopPropagation();
    
        const user = JSON.parse(localStorage.getItem("user")); // Récupérer l'utilisateur connecté
        console.log("Utilisateur récupéré :", user);
    
        if (!user || !user.id) {
            alert("Vous n'êtes pas connecté");
            return;
        }
    
        try {
            const likedArtworksKey = "likedArtworks_" + user.id;
            let likedArtworks = JSON.parse(localStorage.getItem(likedArtworksKey)) || [];
    
            if (!liked) {
                // Ajouter un like
                const response = await LikeService.addLike(artwork.id_artwork);
    
                if (response.status === 201) {
                    setLiked(true);
                    console.log("Ajout du like ok");
                    likedArtworks.push(artwork.id_artwork);
                    localStorage.setItem(likedArtworksKey, JSON.stringify(likedArtworks));
                }
            } else {
                // Supprimer un like
                const response = await LikeService.deleteLike(artwork.id_artwork);
    
                if (response.status === 201) {
                    setLiked(false);
                    console.log("Suppression du like ok");
                    likedArtworks = likedArtworks.filter((id) => id !== artwork.id_artwork);
                    localStorage.setItem(likedArtworksKey, JSON.stringify(likedArtworks));
                }
            }
        } catch (error) {
            console.error(liked ? "Erreur lors de la suppression du like :" : "Erreur lors de l'ajout du like :", error);
        }
    };
    
    useEffect(() => {
        if (isAuthenticated) {
            fetchLikedArtworks();
        }
    }, [isAuthenticated]);


    return (
        <Card
            className="card artwork-card"
            onClick={onClick}
            style={{ cursor: "pointer", position: "relative" }}
        >
            <Card.Img
                className="card-img"
                src={config.url + "/images/" + artwork.image_url}
                alt={artwork.title}
            />
            {isAuthenticated && (
                <div
                    className={"like-icon " + (liked ? "liked" : "")}
                    onClick={handleLikeClick}
                >
                    <Heart fill={liked ? "red" : "none"} color={liked ? "red" : "white"} />
                </div>
            )}
            <Card.Body>
                <Card.Text className="card-title">{artwork.title}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCard;
