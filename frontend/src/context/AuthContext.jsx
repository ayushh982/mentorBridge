import { createContext, useContext, useEffect, useState } from "react";

import {
    getCurrentUser,
    logoutUser,
} from "../services/auth.service";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

const fetchUser = async () => {
    try {
        const res = await getCurrentUser();
        setUser(res.data);
    } catch {
        setUser(null);
    } finally {
        setLoading(false);
    }
};

    const logout = async () => {

        await logoutUser();

        setUser(null);

    };

    useEffect(() => {

        fetchUser();

    }, []);

    return (

        <AuthContext.Provider
            value={{
                user,
                setUser,
                loading,
                fetchUser,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);