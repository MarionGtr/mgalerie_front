import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import UserService from "../Services/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
        setError(""); 
        try {
            await UserService.SendCode(mail); 
            setMail({ email: "" }); 
            toast.success("Code envoyé") 
            navigate("/resetPassword"); 
        } catch (error) {
            console.log(error);
            setError("Une erreur est survenue. Vérifiez l'adresse email.");
        }
    };

    return (
        <div className="form-container">
        <div className="bloc-form">
          <h1 className="mb-4 d-flex justify-content-start">
            Réinitialisation de mot de passe
          </h1>
          
          {error && (
            <div className="alert alert-danger mb-3" role="alert">
              {error}
            </div>
          )}
          
          <Form className="global-form" onSubmit={handleSubmit}>
            <Form.Group className="form-group">
              <Form.Label style={{ color: 'var(--bleu)' }}>
                Adresse mail
              </Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Entrer votre email"
                required
                value={mail.email}
                onChange={handleChange}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-end mt-4">
              <Button 
                className="btn-form" 
                type="submit"
              >
                Envoyer mon code
              </Button>
            </div>
          </Form>
        </div>
      </div>
    );
};

export default SendCode;
