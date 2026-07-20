import { createContext, useContext, useEffect, useState } from "react";
import authService from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const currentUser = authService.getCurrentUser();

        if (currentUser) {
            setUser(currentUser);
        }

        setLoading(false);

    }, []);

    const login = async (loginData) => {

        const data = await authService.login(loginData);

        setUser({
            fullName: data.fullName,
            email: data.email,
            role: data.role
        });

        return data;
    };

    const register = async (registerData) => {

        return await authService.register(registerData);
    };

    const logout = () => {

        authService.logout();

        setUser(null);
    };

    const value = {

        user,

        loading,

        login,

        register,

        logout,

        isAuthenticated: !!user

    };

    return (

        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);