import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ArtworkService from "../services/ArtworkService";
import CommentService from "../services/CommentService";
import config from "../config/url";
import AuthContext from "../Context/AuthContext";

const ArtworkDetailsPage = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const { isAuthenticated, user } = useContext(AuthContext);

    const fetchArtworkByID = async () => {
        try {
            const response = await ArtworkService.getArtworkByID(id);
            setArtwork(response.data[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchComments = async () => {
        try {
            const response = await CommentService.getComments(id);
            setComments(response.data);
        } catch (error) {
            console.log("Erreur lors de la récupération des commentaires :", error);
        }
    };

    const handleAddComment = async () => {
        if (!isAuthenticated || !user) {
            console.error("Utilisateur non défini !");
            console.log("Utilisateur récupéré :", user);

            return;
        }
        if (newComment.trim() === "") {
            console.error("Le commentaire est vide !");
            return;
        }
    
        try {
            console.log("Données envoyées :", { id, content: newComment, id_user: user.id_user });
    
            const response = await CommentService.addComment(id, newComment, user.id_user);
    
            if (!response.data || !response.data.id_comment) {
                console.error("Réponse invalide de l'API :", response.data);
                return;
            }
    
            const newCommentData = {
                id_comment: response.data.id_comment,
                content: newComment,
                created_at: new Date().toISOString(),
                id_artwork: id,
                id_user: user.id_user,
                username: user.username
            };
    
            setComments([newCommentData, ...comments]);
            setNewComment("");  // Réinitialise le champ
        } catch (error) {
            console.error("Erreur lors de l'ajout du commentaire :", error.response?.data || error);
        }
    };
    
    

    useEffect(() => {
        fetchArtworkByID();
        fetchComments();
    }, [id]);

    return (
        <div className="body-details">
            <div className="body-haut">
                <div className="details-gauche">
                    <div className="art-title">
                        <h1>{artwork.title}</h1>
                    </div>
                    <div className="art-artist">
                        <h2>{artwork.artist}</h2>
                    </div>
                    <div className="art-description">
                        <h3>{artwork.description}</h3>
                    </div>
                    <div className="art-size">
                        <h3>Dimensions : {artwork.size}</h3>
                    </div>
                    <div className="art-creation_date">
                        <h3>Crée en {artwork.creation_date}</h3>
                    </div>
                </div>

                <div className="details-droite">
                    {artwork.image_url ? (
                        <img className="card-img" src={config.url + "/images/" + artwork.image_url} alt={artwork.title} />
                    ) : (
                        <h4>Image non disponible</h4>
                    )}
                </div>
            </div>

            <div className="block-comment">
                {comments.map((comment) => (
                    <div key={comment.id_comment} className="comment-card">
                        <h5 className="comment-username">{comment.username}</h5>
                        <h4 className="comment-text">{comment.content}</h4>
                        <div className="comment-date">
                            {new Date(comment.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>
                    </div>
                ))}

                {isAuthenticated && (
                    <div className="comment-input">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Ajouter un commentaire..."
                        ></textarea>
                        <button onClick={handleAddComment}>Envoyer</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ArtworkDetailsPage;
