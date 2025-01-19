import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { Outlet } from "react-router-dom";
import LoginPage from "../Pages/LoginPage";

const RouteSecu = () => {
    const {isAuthenticated} = useContext(AuthContext)

    return isAuthenticated ? <Outlet /> : <LoginPage />
}
 
export default RouteSecu;