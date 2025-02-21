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

    return <Container className='mt-5'>

        <h1 className="mb-4">Connexion</h1>

        <Form onSubmit={handleSubmit}>


            <Form.Group className="mb-3">
                <Form.Label className="text-danger">Mail</Form.Label>
                <Form.Control name="email" type="email" required value={user.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label style={{ color: 'var(--bleu)' }}>Mot de passe</Form.Label>
                <Form.Control name="password" type="password" required value={user.password} onChange={handleChange} />
            </Form.Group>

            <div className="text-center">
                <Button type="submit" style={{ backgroundColor: 'var(--jaune)', border: 'none', color: 'black' }}>
                    Inscription
                </Button>


                <Button type="submit" style={{ backgroundColor: 'var(--jaune)', border: 'none', color: 'black' }}>
                    Se connecter
                </Button>
                <Button type="submit" style={{ backgroundColor: 'var(--jaune)', border: 'none', color: 'black' }} onClick={() => navigate("/SendCode")} >
                    Mot de passe oublié
                </Button>
            </div>
        </Form>
    </Container>

}

export default LoginPage;