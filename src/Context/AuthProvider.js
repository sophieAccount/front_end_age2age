import React, { createContext, useContext, useState } from "react";
import {api_url} from '../env/config.js'

export const AuthContext = createContext({
    token: null,
    setToken: (value) => { },
    userData: null,
    setUserData: (value) => { },
    userId: null,
    setUserId: (value) => { },
    config: api_url,
    setConfig: (value) => { },
});

export function useAuthContext() {
    return useContext(AuthContext);
}

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }
