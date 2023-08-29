import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext({
    token: null,
    setToken: (value) => { },
    userData: null,
    setUserData: (value) => { },
    userId: null,
    setUserId: (value) => { },

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
