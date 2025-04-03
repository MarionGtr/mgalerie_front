import { useContext, useEffect, useState } from "react";
import AuthContext from "../Context/AuthContext";
import UserService from "../Services/UserService";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AuthService from "../Services/AuthService";

const UserPage = () => {
    const { isAuthenticated, setIsAuthenticated, userRole, setUserRole } = useContext(AuthContext);
    const [user, setUser] = useState({});
    const [tempUser, setTempUser] = useState({}); //valeur temporaire lors de la saisie
    const navigate = useNavigate();
    const [usernameUpdate, setUsernameUpdate] = useState(false);
    const [nameUpdate, setNameUpdate] = useState(false);
    const [firstNameUpdate, setFirstNameUpdate] = useState(false);
    const [lastNameUpdate, setLastNameUpdate] = useState(false);

    const fetchUser = async () => {
        try {
            const response = await UserService.profil();
            setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setTempUser({ ...tempUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await UserService.updateUser(user.id_user, tempUser); //il attend tempUser car user pas encore modifié tant que pas validé
            setUser(tempUser); // met à jour User après validation
            setUsernameUpdate(false);
            setNameUpdate(false);
            setFirstNameUpdate(false);
            setLastNameUpdate(false);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancel = (toggleSetter) => {
        setTempUser(user); // restaure la valeur initiale de user
        toggleSetter(false); // Ferme l'input
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        if (!window.confirm("Etes-vous sûr de vouloir supprimer votre compte ?")) return;
        try {
            await UserService.deleteMyAccount(user.id_user);
            setIsAuthenticated(false);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchUser();
        setUserRole(AuthService.getRoleUser());
    }, [isAuthenticated]);

    return <>
        <div className="body-user">
            <div className="bloc-user">
                <div className="mon-compte">
                    <h1>MON COMPTE</h1>

                    {userRole === "admin" && (
                        <div className="d-flex mt-3">
                            <Button variant="warning" onClick={() => navigate("/admin")}>GESTION ADMIN</Button>
                        </div>
                    )}

                    <Button variant="light" onClick={() => navigate("/profil")}>Retour</Button>


                </div>

                <div className="ligne-moncompte">
                    <div className="user-libelle"><h2>Profil de</h2></div>
                    {usernameUpdate ? (
                        <div className="edit-container">
                            <input
                                type="text"
                                name="username"
                                value={tempUser.username || ""}
                                onChange={handleChange}
                            />
                            <Button variant="danger" onClick={() => handleCancel(setUsernameUpdate)}>Annuler</Button>
                            <Button variant="light" onClick={handleSubmit}>Valider</Button>
                        </div>
                    ) : (
                        <>
                            <h2>{user.username}</h2>
                            <Button variant="light" onClick={() => { setUsernameUpdate(true); setTempUser(user); }}>
                                <img src="src/assets/logos/editer.png" alt="modify" />
                            </Button>
                        </>
                    )}
                </div>

                <div className="ligne-moncompte">
                    <div className="user-libelle"><h2>Email</h2></div>
                    {nameUpdate ? (
                       <div className="edit-container">
                            <input type="text" name="email" value={tempUser.email || ""} onChange={handleChange} />
                            <Button variant="danger" onClick={() => handleCancel(setNameUpdate)}>Annuler</Button>
                            <Button variant="light" onClick={handleSubmit}>Valider</Button>
                        </div>
                    ) : (
                        <>
                            <h2>{user.email}</h2>
                            <Button variant="light" onClick={() => { setNameUpdate(true); setTempUser(user); }}>
                                <img src="src/assets/logos/editer.png" alt="modify" />
                            </Button>
                        </>
                    )}
                </div>

                <div className="ligne-moncompte">
                    <div className="user-libelle"><h2>Prénom</h2></div>
                    {firstNameUpdate ? (
                        <div className="edit-container">
                            <input type="text" name="first_name" value={tempUser.first_name || ""} onChange={handleChange} />
                            <Button variant="danger" onClick={() => handleCancel(setFirstNameUpdate)}>Annuler</Button>
                            <Button variant="light" onClick={handleSubmit}>Valider</Button>
                        </div>
                    ) : (
                        <>
                            <h2>{user.first_name}</h2>
                            <Button variant="light" onClick={() => { setFirstNameUpdate(true); setTempUser(user); }}>
                                <img src="src/assets/logos/editer.png" alt="modify" />
                            </Button>
                        </>
                    )}
                </div>

                <div className="ligne-moncompte">
                    <div className="user-libelle"><h2>Nom</h2></div>
                    {lastNameUpdate ? (
                        <div className="edit-container">
                            <input type="text" name="last_name" value={tempUser.last_name || ""} onChange={handleChange} />
                            <Button variant="danger" onClick={() => handleCancel(setLastNameUpdate)}>Annuler</Button>
                            <Button variant="light" onClick={handleSubmit}>Valider</Button>
                        </div>
                    ) : (
                        <>
                            <h2>{user.last_name}</h2>
                            <Button variant="light" onClick={() => { setLastNameUpdate(true); setTempUser(user); }}>
                                <img src="src/assets/logos/editer.png" alt="modify" />
                            </Button>
                        </>
                    )}
                </div>

                <div className="ligne-mdp">
                    <div className="d-flex mt-3">
                        <h2><Button variant="light" onClick={() => navigate("/SendCode")}>Modifier mon mot de passe</Button></h2>
                    </div>
                    <div className="d-flex gap-3 flex-end">
                        <div className="d-flex mt-3">
                            <h2><Button variant="light" onClick={handleDelete}>Supprimer mon compte</Button></h2>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </>
};

export default UserPage;
