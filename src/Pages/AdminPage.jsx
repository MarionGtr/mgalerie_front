import React, { useState, useEffect, useRef } from 'react';
import ArtworkService from '../services/ArtworkService';
import axios from 'axios';
import UserService from '../Services/UserService';
import { Button } from 'react-bootstrap';

const AdminPage = () => {
    const [artworks, setArtworks] = useState([]);
    const [selectedArtwork, setSelectedArtwork] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        artist: '',
        description: '',
        size: '',
        creation_date: '',
        image_url: '',
    });

    const [users, setUsers] = useState([]);
    const [activeTab, setActiveTab] = useState('artworks');

    const formRef = useRef(null);

    useEffect(() => {
        loadArtworks();
        loadUsers();
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

    const loadUsers = async () => {
        try {
            const response = await UserService.allUsers();
            setUsers(response.data);
        } catch (error) {
            console.error("Erreur lors du chargement des utilisateurs:", error);
            alert("Erreur lors du chargement des utilisateurs");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
            try {
                await UserService.deleteMyAccount(userId);
                alert("Utilisateur supprimé avec succès");
                loadUsers();
            } catch (error) {
                console.error("Erreur lors de la suppression de l'utilisateur:", error);
                alert("Erreur lors de la suppression de l'utilisateur");
            }
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
            <div className="tab-navigation">
                <Button
                    onClick={() => setActiveTab('artworks')}
                    className={`btn-form ${activeTab === 'artworks' ? 'active' : ''}`}
                    variant="primary"
                >
                    Gestion des Œuvres
                </Button>
                <Button
                    onClick={() => setActiveTab('users')}
                    className={`btn-form ${activeTab === 'users' ? 'active' : ''}`}
                    variant="primary"
                >
                    Gestion des Utilisateurs
                </Button>
            </div>

            {activeTab === 'artworks' && (
                <>
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
                            <Button type="submit" className="btn-form">
                                {selectedArtwork ? "Modifier" : "Ajouter"}
                            </Button>
                            {selectedArtwork && (
                                <Button
                                    type="button"
                                    onClick={resetForm}
                                    className="cancel-button"
                                >
                                    Annuler
                                </Button>
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
                                    <th></th>
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
                                            <Button
                                                onClick={() => handleEdit(artwork)}
                                                className="edit-button"
                                                variant="warning"
                                            >
                                                Modifier
                                            </Button>
                                            <Button
                                                onClick={() => handleDelete(artwork.id_artwork)}
                                                className="delete-button"
                                                variant="danger"
                                            >
                                                Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}

            {activeTab === 'users' && (
                <div>
                    <h1>Gestion des Utilisateurs</h1>
                    <div className="table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Pseudo</th>
                                    <th>Email</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id_user}>
                                        <td>{user.first_name}</td>
                                        <td>{user.last_name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td className="action-buttons">
                                            <Button
                                                onClick={() => handleDeleteUser(user.id_user)}
                                                className="delete-button"
                                                variant="danger"
                                            >
                                                Supprimer
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;