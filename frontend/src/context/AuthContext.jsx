/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);
export const AuthContextProvider = ({ children }) => {
    const userData = localStorage.getItem('user-info');
    const user = userData ? JSON.parse(userData) : null;
    const [authUser, setAuthUser] = useState(user);
    return <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
    </AuthContext.Provider>
}