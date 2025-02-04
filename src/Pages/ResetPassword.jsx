import { useState, useContext } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const ResetPassword = () => {
    const { user } = useContext(AuthContext); // Récupère l'email du contexte
    const [formData, setFormData] = useState({
        email: user?.email || "", // Prérempli avec l'email stocké
        token: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);
    
        if (formData.newPassword !== formData.confirmPassword) {
            setError("Les mots de passe ne correspondent pas.");
            return;
        }
    
        try {
            console.log("Données envoyées au serveur :", JSON.stringify(formData, null, 2)); // Log détaillé
            const response = await UserService.ResetPassword(formData);
            console.log("Réponse API :", response.data);
    
            setSuccess(true);
            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            console.error("Erreur Axios :", error.response ? error.response.data : error.message);
            setError(error.response?.data?.message || "Échec de la réinitialisation.");
        }
    };    
    
    
    return (
        <>
            <h2>Réinitialisation du mot de passe</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            {success && <p style={{ color: "green" }}>Mot de passe modifié avec succès ! Redirection...</p>}

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Adresse mail</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Code reçu par email</Form.Label>
                    <Form.Control
                        name="token"
                        type="text"
                        placeholder="Entrez le code"
                        required
                        value={formData.token}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Nouveau mot de passe</Form.Label>
                    <Form.Control
                        name="newPassword"
                        type="password"
                        placeholder="Nouveau mot de passe"
                        required
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Confirmer le mot de passe</Form.Label>
                    <Form.Control
                        name="confirmPassword"
                        type="password"
                        placeholder="Confirmez le mot de passe"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button variant="outline-dark" type="submit">
                    Réinitialiser le mot de passe
                </Button>
            </Form>
        </>
    );
};

export default ResetPassword;
