import { useEffect, useState, useContext } from "react";
import UserService from "../Services/UserService";
import ArtworkCard from "../Components/ArtworkCard";
import AuthContext from "../Context/AuthContext";
import LikeService from "../Services/LikeService";

const ProfilPage = () => {
    const { user: authenticatedUser, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [likedArtworks, setLikedArtworks] = useState([]);

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
                <h2>Email : {user.email}</h2>
                <h2>Prénom : {user.first_name}</h2>
                <h2>Nom : {user.last_name}</h2>
            </div>

            <div className="profil-like">
                <h1>Vos œuvres préférées :</h1>
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
