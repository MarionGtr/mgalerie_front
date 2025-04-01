import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Signin = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        //...user = copie colle les données déjà renseignées
        setUser({ ...user, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (user.password !== user.verifyPassword) {
            alert("Les mots de passe ne correspondent pas")

        }

        try {
            const response = await UserService.signin(user)
            toast.success("Inscription réussie !")
            navigate('/profil')
            // console.log(response)
        } catch (error) {
            toast.error("Erreur lors de l'inscription, veuillez réessayer")
            console.error(error)
            return;
        }
    }

    return <div className="form-container">
        <div className="bloc-form">
            <h1 className="mb-4 d-flex justify-content-start">Créer un compte</h1>

            <Form className="global-form" onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label style={{ color: 'var(--bleu)' }}>Nom</Form.Label>
                    <Form.Control name="last_name" type="text" required value={user.last_name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label style={{ color: 'var(--bleu)' }}>Prénom</Form.Label>
                    <Form.Control name="first_name" type="text" required value={user.first_name} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label style={{ color: 'var(--bleu)' }}>Pseudo</Form.Label>
                    <Form.Control name="username" type="text" required value={user.username} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label style={{ color: 'var(--bleu)' }}>Mail</Form.Label>
                    <Form.Control name="email" type="email" required value={user.email} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="form-group">
                    <Form.Label style={{ color: 'var(--bleu)' }}>Mot de passe</Form.Label>
                    <Form.Control name="password" type="password" required value={user.password} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-4">
                    <Form.Label style={{ color: 'var(--bleu)' }}>Vérifier mot de passe</Form.Label>
                    <Form.Control name="verifyPassword" type="password" required value={user.verifyPassword} onChange={handleChange} />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button className="btn-form" type="submit" >
                        Inscription
                    </Button>
              </div>
            </Form>
        </div>
    </div>


}

export default Signin;