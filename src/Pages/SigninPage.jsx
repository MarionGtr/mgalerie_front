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

    return <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>

        <h1>Formulaire d'inscription</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse mail</Form.Label>
                <Form.Control name="email" type="email" placeholder="Entrer email" required={true} value={user.email} onChange={handleChange} />
                <Form.Text className="text-muted">
                    Nous ne paragerons jamais votre email avec quelqu'un d'autre.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control name="first_name" type="text" placeholder="Entrer prénom" required={true} value={user.first_name} onChange={handleChange} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Nom</Form.Label>
                <Form.Control name="last_name" type="text" placeholder="Entrer nom" required={true} value={user.last_name} onChange={handleChange} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Pseudo</Form.Label>
                <Form.Control name="username" type="text" placeholder="Entrer pseudo" required={true} value={user.username} onChange={handleChange} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Choisissez un mot de passe" name='password' value={user.password} onChange={handleChange} required={true} />
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Verifiez votre mot de passe</Form.Label>
                <Form.Control type="password" placeholder="Verifiez votre mot de passe" name='verifyPassword' value={user.verifyPassword} onChange={handleChange} required={true} />
            </Form.Group>

            <Button variant="primary" type="submit">
                S'inscrire
            </Button>
        </Form>
    </Container>

}

export default Signin;