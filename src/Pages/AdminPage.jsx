import React, { useState, useEffect, useRef } from 'react';
import ArtworkService from '../services/ArtworkService';
import axios from 'axios';

const AdminPage = () => {
    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [file, setFile]= useState(null);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        description: '',
        size: '',
        creation_date: '',
        image_url: '',
    });
    
    const formRef = useRef(null); 

    useEffect(() => {
        loadArtworks();
    }, []);

    const loadArtworks = async () => {
        try {
            const response = await ArtworkService.getAllImages();
            setArtworks(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des œuvres:", error);
            alert("Erreur lors du chargement des œuvres");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (selectedArtwork) {
                await ArtworkService.updateArtwork(selectedArtwork.id_artwork, formData);
                alert("Œuvre modifiée avec succès");
            } else {
                await ArtworkService.addArtwork(formData);
                alert("Œuvre ajoutée avec succès");
            }  
            handleUpload();
            loadArtworks();
            resetForm();
        } catch (error) {
            console.error("Erreur lors de l'opération:", error);
            alert("Erreur lors de l'opération");
        }
    };
    const handleUpload = async () => {
      
        // try {
            // if (!file) return;
            
            const formDataUpload = new FormData();
            formDataUpload.append("file", file);
            formDataUpload.append("name", "test");
            
            const response = await axios.post("http://127.0.0.1:3000/image", formDataUpload, {
              
                headers: {
                    "Content-Type": "multipart/form-data"
                }
                
            });
            //   console.log(response)
            // // Update image_url in form with the response
            // setFormData(prev => ({
            //     ...prev,
            //     image_url: file.filename // Adjust based on your API response
            // }));
            
        //     setFile(null);
        // } catch (error) {
        //     console.error("Erreur lors de l'upload:", error);
        //     alert("Erreur lors de l'upload de l'image");
        }
    // };

    const handleDelete = async (id) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cette œuvre ?")) {
            try {
                await ArtworkService.deleteArtwork(id);
                alert("Œuvre supprimée avec succès");
                loadArtworks();
            } catch (error) {
                console.error("Erreur lors de la suppression:", error);
                alert("Erreur lors de la suppression");
            }
        }
    };

    const handleEdit = (artwork) => {
        setSelectedArtwork(artwork);
        setFormData({
            title: artwork.title,
            artist: artwork.artist,
            description: artwork.description,
            size: artwork.size,
            creation_date: artwork.creation_date,
            image_url: artwork.image_url,
        });
        formRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const resetForm = () => {
        setSelectedArtwork(null);
        setFormData({
            title: '',
            artist: '',
            description: '',
            size: '',
            creation_date: '',
            image_url: '',
        });
    };

    return (
        <div className="admin-container">
            <h1>Gestion des Œuvres</h1>

            <form ref={formRef} onSubmit={handleSubmit} className="admin-form">
                <h2>{selectedArtwork ? "Modifier une œuvre" : "Ajouter une œuvre"}</h2>
                
                <div className="form-grid">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Titre"
                        required
                    />
                    <input
                        type="text"
                        name="artist"
                        value={formData.artist}
                        onChange={handleInputChange}
                        placeholder="Artiste"
                        required
                    />
                    <input
                        type="text"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        placeholder="Dimensions"
                        required
                    />
                    <input
                        type="text"
                        name="creation_date"
                        value={formData.creation_date}
                        onChange={handleInputChange}
                        placeholder="Date(s) de création"
                        required
                    />
                  
                    <input
                        type="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                        
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                        className="description-input"
                    />
                </div>

                <div className="button-group">
                    <button type="submit" className="submit-button">
                        {selectedArtwork ? "Modifier" : "Ajouter"}
                    </button>
                    {selectedArtwork && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="cancel-button"
                        >
                            Annuler
                        </button>
                    )}
                </div>
            </form>

            <div className="table-container">
                <table className="artwork-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Artiste</th>
                            <th>Description</th>
                            <th>Dimensions</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {artworks.map((artwork) => (
                            <tr key={artwork.id_artwork}>
                                <td>{artwork.title}</td>
                                <td>{artwork.artist}</td>
                                <td>{artwork.description}</td>
                                <td>{artwork.size}</td>
                                <td>{artwork.creation_date}</td> 
                                <td className="action-buttons">
                                    <button
                                        onClick={() => handleEdit(artwork)}
                                        className="edit-button"
                                    >
                                        Modifier
                                    </button>
                                    <button
                                        onClick={() => handleDelete(artwork.id_artwork)}
                                        className="delete-button"
                                    >
                                        Supprimer
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminPage;
