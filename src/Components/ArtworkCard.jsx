import config from "../config/url";
import Card from "react-bootstrap/Card";
import React, { useState, useContext, useEffect } from "react";
import { Heart } from "lucide-react";
import AuthContext from "../Context/AuthContext";
import LikeService from "../Services/LikeService"; 

function ArtworkCard({ artwork, onClick, onUnlike }) {
    const { isAuthenticated } = useContext(AuthContext); 
    const [liked, setLiked] = useState(false);

    const fetchLikedArtworks = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) return;
    
        try {
            const response = await LikeService.getLikes(); 
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
    
        const user = JSON.parse(localStorage.getItem("user")); 
        console.log("Utilisateur récupéré :", user);
    
        if (!user || !user.id) {
            alert("Vous n'êtes pas connecté");
            return;
        }
    
        try {
            if (liked) {
                const response = await LikeService.deleteLike(artwork.id_artwork);
                if (response.status === 201) {
                    setLiked(false);
                    console.log("Suppression du like ok");
                    if (onUnlike) {
                        onUnlike(artwork.id_artwork);
                    }
                }
            } else {
                const response = await LikeService.addLike(artwork.id_artwork);
                if (response.status === 201) {
                    setLiked(true);
                    console.log("Ajout du like ok");
                }
            }
        } catch (error) {
            console.error("Erreur lors du changement de like :", error);
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
            <Card.Body className="card-body">
                <Card.Text className="card-title">{artwork.title}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default ArtworkCard;
