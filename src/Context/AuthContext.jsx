import { createContext } from "react";

const AuthContext = createContext({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
    user : {},
    setUser : () => {} 
    //roles : [],
    //setRoles : () => {}

})

export default AuthContext;