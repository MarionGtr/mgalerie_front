import { useEffect, useState, useContext } from "react";
import UserService from "../Services/UserService";
import ArtworkCard from "../Components/ArtworkCard";
import AuthContext from "../Context/AuthContext";
import LikeService from "../Services/LikeService";
import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";
import CommentService from "../services/CommentService";

const ProfilPage = () => {
    const { user: authenticatedUser, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [likedArtworks, setLikedArtworks] = useState([]);
    const [userComments, setUserComments] = useState([]);
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await UserService.profil();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchLikedArtworks = async () => {
        try {
            const response = await LikeService.getLikes();
            setLikedArtworks(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchUserComments = async () => {
        if (authenticatedUser && authenticatedUser.id) {
            console.log("ID Utilisateur connecté : ", authenticatedUser.id);
            try {
                const response = await CommentService.getUsersComments(authenticatedUser.id);
                console.log("Réponse API : ", response.data);
                setUserComments(response.data);
            } catch (error) {
                console.error("Erreur lors de la récupération des commentaires : ", error);
            }
        } else {
            console.log("Utilisateur non authentifié ou ID utilisateur manquant");
        }
    };

    const handleUnlike = (artworkId) => {
        setLikedArtworks((prev) => prev.filter((artwork) => artwork.id_artwork !== artworkId));
    };

    useEffect(() => {
        fetchUser();
        if (isAuthenticated && authenticatedUser?.id) {
            fetchLikedArtworks();
            fetchUserComments();
        }
    }, [isAuthenticated, authenticatedUser]);
    
    return (
        <div className="profil-body">
            <div className="profil-info">
                <div className="profil-top">
                    <h1>{user.username}</h1>
                    <Button variant="light" onClick={() => navigate("/user")}>Voir plus</Button>
                </div>
                <div className="user-comment">
                    <h2>Derniers commentaires </h2>
                    {userComments.length > 0 ? (
                        <ul>
                            {userComments.map((comment) => (
                                <li key={comment.id_comment}>
                                    <p><strong>{comment.artwork_title}</strong> - {comment.artwork_artist}</p>
                                    <p>{comment.content}</p>
                                    <p><em>Publié le : {new Date(comment.created_at).toLocaleDateString()}</em></p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>Aucun commentaire trouvé.</p>
                    )}
                </div>
            </div>

            <div className="profil-like">
                <h1>Mes œuvres préférées</h1>
                {likedArtworks.length > 0 ? (
                    <div className="liked-artworks-list">
                        {likedArtworks.map((artwork) => (
                            <ArtworkCard
                                key={artwork.id_artwork}
                                artwork={artwork}
                                onClick={() => navigate("/artworkByID/" + artwork.id_artwork)}
                                onUnlike={handleUnlike} 
                            />
                        ))}
                    </div>
                ) : (
                    <p>Aucune œuvre likée.</p>
                )}
            </div>
        </div>
    );
};

export default ProfilPage;
