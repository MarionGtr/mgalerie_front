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

    return <div className="form-container">
    <div className="bloc-form">
        <h1 className="mb-4 d-flex justify-content-start">Créer un compte</h1>

        <Form className="global-form" onSubmit={handleSubmit}>

            <Form.Group className="form-group">
                <Form.Label style={{ color: 'var(--bleu)' }}>Mail</Form.Label>
                <Form.Control name="email" type="email" required value={user.email} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="form-group">
                <Form.Label style={{ color: 'var(--bleu)' }}>Mot de passe</Form.Label>
                <Form.Control name="password" type="password" required value={user.password} onChange={handleChange} />
            </Form.Group>


            <div className="grp-btn-form">
                <div>
                Pas encore de compte? 
                <p type="submit" onClick={() => navigate("/Signin")}>S'inscrire</p>
                </div>
                <Button className="btn-form" type="submit" style={{ backgroundColor: 'var(--bleu)', border: 'none', color: 'white' }} onClick={() => navigate("/SendCode")} >
                    Mot de passe oublié
                </Button>
                <Button className="btn-form" type="submit" style={{ backgroundColor: 'var(--bleu)', border: 'none', color: 'white' }}>
                    Se connecter
                </Button>
            </div>
        </Form>
    </div>
</div>



}

export default LoginPage;