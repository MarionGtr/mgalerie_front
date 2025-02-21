import { useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import UserService from '../Services/UserService';
import { useNavigate } from 'react-router-dom';

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
        // console.log(user)
        if (user.password !== user.verifyPassword) {
            alert("Les mots de passe ne correspondent pas")

        }

        try {
            const response = await UserService.signin(user)
            navigate('/profil')
            // console.log(response)
        } catch (error) {
            console.error(error)
            return;
        }
    }

    return <Container className="mt-3">
    <h1 className="mb-4">Créer un compte</h1>
    
    <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
            <Form.Label className="text-danger">Nom</Form.Label>
            <Form.Control name="last_name" type="text" required value={user.last_name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label style={{color: 'var(--bleu)'}}>Prénom</Form.Label>
            <Form.Control name="first_name" type="text" required value={user.first_name} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label style={{color: 'var(--jaune)'}}>Pseudo</Form.Label>
            <Form.Control name="username" type="text" required value={user.username} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label className="text-danger">Mail</Form.Label>
            <Form.Control name="email" type="email" required value={user.email} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
            <Form.Label style={{color: 'var(--bleu)'}}>Mot de passe</Form.Label>
            <Form.Control name="password" type="password" required value={user.password} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-4">
            <Form.Label style={{color: 'var(--jaune'}}>Vérifier mot de passe</Form.Label>
            <Form.Control name="verifyPassword" type="password" required value={user.verifyPassword} onChange={handleChange} />
        </Form.Group>

        <div className="text-center">
            <Button type="submit" style={{backgroundColor: 'var(--jaune)', border: 'none', color: 'black'}}>
                Inscription
            </Button>
        </div>
    </Form>
</Container>
    

}

export default Signin;