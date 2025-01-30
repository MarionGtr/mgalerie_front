import { useEffect, useState, useContext } from "react";
import UserService from "../Services/UserService";
import ArtworkCard from "../Components/ArtworkCard";
import AuthContext from "../Context/AuthContext";
import LikeService from "../Services/LikeService";
import { Button } from "react-bootstrap";
import React from "react";
import { useNavigate } from "react-router-dom";


const ProfilPage = () => {
    const { user: authenticatedUser, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [likedArtworks, setLikedArtworks] = useState([]);
    const navigate = useNavigate();

    
    //infos
    const fetchUser = async () => {
        try {
            const response = await UserService.profil();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    //Likes
    const fetchLikedArtworks = async () => {
        try {
            const response = await LikeService.getLikes(); 
            setLikedArtworks(response.data); 
        } catch (error) {
            console.error(error); 
        }
    };
    


    useEffect(() => {
        fetchUser();
        if (isAuthenticated) {
            fetchLikedArtworks(); 
        }
    }, [isAuthenticated]);

    return (
        <div className="profil-body">
            <div className="profil-info">
                <h1>Profil de : {user.username}</h1>
                <Button variant="light" onClick={() => navigate("/user")}>Voir plus</Button>
                <h2>Derniers commentaires :</h2>
            </div>

            <div className="profil-like">
                <h1>Mes œuvres préférées</h1>
                {likedArtworks.length > 0 ? (
                    <div className="liked-artworks-list">
                        {likedArtworks.map((artwork) => (
                            <ArtworkCard
                                key={artwork.id_artwork}
                                artwork={artwork}
                                onClick={() => console.log("Détails de l'œuvre", artwork.id_artwork)}
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
