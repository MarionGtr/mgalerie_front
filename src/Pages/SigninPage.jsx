import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Signin = () => {
    const [user, setUser] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target
        //...user = copie colle les données déjà renseignées
        setUser({ ...user, [name]: value })
    }

    const handleSubmit =  (e) => {
        e.preventDefault()
        if (user.password !== user.verifiyPassword) {
            alert("Les mots de passe ne correspondent pas")
        }
        try {
            const response = UserService.signin(user)
            axios.default.headers('Authorization', `Bearer ${response.data.token}`)
            console.log(response.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    return <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>

        <h1>Formulaire d'inscription</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse mail</Form.Label>
                <Form.Control name="email" type="email" placeholder="Entrer email" value={user.email} onChange={handleChange} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>Prénom</Form.Label>
                <Form.Control name="first_name" type="text" placeholder="Entrer prénom" value={user.first_name} onChange={handleChange} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Nom</Form.Label>
                <Form.Control name="last__name" type="text" placeholder="Entrer nom" value={user.last_name} onChange={handleChange} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Pseudo</Form.Label>
                <Form.Control name="username" type="text" placeholder="Entrer pseudo" value={user.username} onChange={handleChange} />
                <Form.Text className="text-muted">
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicVerifyPassword">
                <Form.Label>Confirmation de mot de passe</Form.Label>
                <Form.Control name="password" type="password" placeholder="Password" value={user.verifyPassword} onChange={handleChange} />
            </Form.Group>

            <Button variant="primary" type="submit">
                S'inscrire
            </Button>
        </Form>
    </Container>

}

export default Signin;