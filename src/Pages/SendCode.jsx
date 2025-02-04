import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";

const SendCode = () => {
    const [mail, setMail] = useState({ email: "" });
    const [error, setError] = useState(""); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMail({ ...mail, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Réinitialise les erreurs
        try {
            await UserService.SendCode(mail);  // Envoie l'email à l'API
            setMail({ email: "" });  // Vide le champ après envoi
            navigate("/resetPassword"); // Redirection après succès
        } catch (error) {
            console.log(error);
            setError("Une erreur est survenue. Vérifiez l'adresse email.");
        }
    };

    return (
        <>
            <h2>Envoyez un code de réinitialisation par mail</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Form onSubmit={handleSubmit}> 
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Adresse mail</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Entrer email"
                        required
                        value={mail.email}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Button variant="outline-dark" type="submit">
                    Envoyer mon code
                </Button>
            </Form>
        </>
    );
};

export default SendCode;
