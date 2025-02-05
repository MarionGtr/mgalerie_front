import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../Context/AuthContext";

const RouteSecu = ({ role }) => {
    const { isAuthenticated, userRole } = useContext(AuthContext);

    console.log("Vérification accès - Authentifié:", isAuthenticated, "Rôle:", userRole);

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (role && userRole !== role) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default RouteSecu;
