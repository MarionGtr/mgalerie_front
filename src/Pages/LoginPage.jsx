import { useContext, useState } from "react"
import { Container } from "react-bootstrap"
import { Form } from "react-router-dom"
import AuthContext from "../Context/AuthContext"

const LoginPage = () => {

    const [user, setUser] = useState({})
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthContext)

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await UserService.login(user)
            // précise le token pour toutes les requêtes axios
            axios.default.headers('Authorization', `Bearer ${response.data.token}`)
            localStorage.setItem('token', response.data.token)
            setIsAuthenticated(true)
            //Navigate('/profil')
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
        </Form>
    </Container>

}

export default LoginPage;