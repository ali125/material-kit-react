import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import AuthService from "../services/AuthService";

const INITIAL = {
    isLoggedIn: null,
}

export const AuthContext = createContext(INITIAL);

const AuthContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const token = AuthService.getToken();

        setIsLoggedIn(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {isLoggedIn !== null && children}
        </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.any,
};

export default AuthContextProvider;
