import { createContext } from "react";

const AuthContext = createContext({
    isAuthentificated: false,
    setIsAuthentificated: () => {},
    user : {},
    setUser : () => {} 
    //roles : [],
    //setRoles : () => {}

})

export default AuthContext;