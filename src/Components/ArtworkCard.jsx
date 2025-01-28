import config from "../config/url";
import Card from "react-bootstrap/Card";
import React, { useState, useContext, useEffect } from "react";
import { Heart } from "lucide-react";
import AuthContext from "../Context/AuthContext";
import LikeService from "../Services/LikeService"; 

function ArtworkCard({ artwork, onClick }) {
    const { isAuthenticated } = useContext(AuthContext); 
    const [liked, setLiked] = useState(false);

    const fetchLikedArtworks = () => {
        const likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || [];
        setLiked(likedArtworks.includes(artwork.id_artwork));
    };

    const handleLikeClick = async (e) => {
        e.stopPropagation();

        if (isAuthenticated) {
            try {
                if (!liked) {
                    // Ajouter un like
                    const response = await LikeService.addLike(artwork.id_artwork);

                    if (response.status === 201) {
                        setLiked(true);
                        console.log("Ajout du like ok");

                        // Mettre à jour localStorage
                        const likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || [];
                        if (!likedArtworks.includes(artwork.id_artwork)) {
                            likedArtworks.push(artwork.id_artwork);
                            localStorage.setItem('likedArtworks', JSON.stringify(likedArtworks));
                        }
                    }
                } else {
                    // Supprimer un like
                    const response = await LikeService.deleteLike(artwork.id_artwork);

                    if (response.status === 201) {
                        setLiked(false);
                        console.log("Suppression du like ok");

                        // Mettre à jour localStorage
                        const likedArtworks = JSON.parse(localStorage.getItem('likedArtworks')) || [];
                        const updatedLikedArtworks = likedArtworks.filter(
                            (id) => id !== artwork.id_artwork
                        );
                        localStorage.setItem('likedArtworks', JSON.stringify(updatedLikedArtworks));
                    }
                }
            } catch (error) {
                console.error(
                    liked
                        ? "Erreur lors de la suppression du like :"
                        : "Erreur lors de l'ajout du like :",
                    error
                );
            }
        } else {
            alert("Vous n'êtes pas connecté");
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
                    className={`like-icon ${liked ? "liked" : ""}`}
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
