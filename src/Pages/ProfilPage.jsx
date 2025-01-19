import { useEffect, useState } from "react"
import UserService from "../Services/UserService"

const ProfilPage = () => {

    const [user, setUser] = useState({})
    const fetchUser = async () => {
        try {
            const response = await UserService.profil()
            console.log("Réponse API:", response)
            setUser(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return <>

    <h1>Profil de : {user.username}</h1>
    <h1>Email :{user.email}</h1>
    <h1>Prénom :{user.first_name}</h1>
    <h1>Nom :{user.last_name}</h1>

    </>
}

export default ProfilPage;