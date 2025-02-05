import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user: {},
    setUser: () => {},
    userRole: "", 
    setUserRole: () => {}
});

export default AuthContext;