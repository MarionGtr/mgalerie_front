import { useContext, useState } from "react"
import { Button, Container } from "react-bootstrap"
import { Form } from "react-bootstrap"
import AuthContext from "../Context/AuthContext"
import UserService from "../Services/UserService"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const LoginPage = () => {
   

    const [user, setUser] = useState({})
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext)

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await UserService.login(user)
            // précise le token pour toutes les requêtes axios
            axios.defaults.headers['Authorization'] = `Bearer ${response.data.token}`
            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            navigate('/profil')
            // console.log(response.data)
        } catch (error) {
            console.log(error)

        }
    }

    return <Container className='d-flex flex-column justify-content-center align-items-center mt-5'>

        <h1>Connexion</h1>

        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Adresse mail</Form.Label>
                <Form.Control name="email" type="email" placeholder="Entrer email" required={true} value={user.email} onChange={handleChange} />
                <Form.Text className="text-muted">
                    Nous ne paragerons jamais votre email avec quelqu'un d'autre.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Mot de passe</Form.Label>
                <Form.Control name="password" type="password" placeholder="Entrer email" required={true} value={user.password} onChange={handleChange} />
            </Form.Group>

            <Button variant="outline-dark" type="submit">
                Se connecter
            </Button>
            <Button variant="outline-dark" type="submit">
                Mot de passe oublié
            </Button>

        </Form>
    </Container>

}

export default LoginPage;