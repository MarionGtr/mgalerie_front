import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserPage = () => {

    const { user: authenticatedUser, isAuthenticated } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const navigate = useNavigate();

    const fetchUser = async () => {
        try {
            const response = await UserService.profil();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [isAuthenticated]);



    return <>

        <div className="body-user">

            <div className="bloc-user">

                <div className="mon-compte">
                    <h1>MON COMPTE</h1>
                    <Button variant="light" onClick={() => navigate("/profil")}>Retour</Button>
                </div>

                <div className="ligne-moncompte">
                <div className="user-libelle"><h2>Profil de </h2></div>
                    <div className="user-api"><h2>{user.username}</h2></div>
                    <img src="src\assets\logos\editer.png" alt="modify" />
                </div>

                <div className="ligne-moncompte">
                <div className="user-libelle"><h2>Email </h2></div>
                    <div className="user-api"><h2>{user.email}</h2></div>
                    <img src="src\assets\logos\editer.png" alt="modify" />
                </div>

                <div className="ligne-moncompte">
                    <div className="user-libelle"><h2>Prénom</h2></div>
                    <div className="user-api"><h2>{user.first_name}</h2></div>
                    <img src="src\assets\logos\editer.png" alt="modify" />
                </div>

                <div className="ligne-moncompte">
                    <div className="user-libelle"><h2>Nom </h2></div>
                    <div className="user-api"><h2>{user.last_name}</h2></div>
                    <img src="src\assets\logos\editer.png" alt="modify" />
                </div>

                <div className="ligne-mdp">
                    <div className="d-flex mt-3"><h2><Button variant="light" >Modifier mon mot de passe</Button></h2></div>
                    <div className="d-flex gap-3 flex-end">
                    <div className="d-flex mt-3"><h2><Button variant="light" >OK</Button></h2></div>
                    <div className="d-flex mt-3"><h2><Button variant="light" >Supprimer mon compte</Button></h2></div>
                    </div>
                </div>


            </div>

        </div>

    </>
}

export default UserPage;