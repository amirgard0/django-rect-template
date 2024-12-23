import { createContext, useState, useEffect } from 'react';
import { setAccessToken } from '../services/api';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state for initialization

    useEffect(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
            // Attempt to refresh the access token
            axios
                .post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken })
                .then((response) => {
                    setAccessToken(response.data.access);
                    setUser({ loggedIn: true });
                })
                .catch(() => {
                    localStorage.removeItem('refresh_token');
                    setAccessToken(null);
                    setUser(null);
                })
                .finally(() => {
                    setLoading(false); // Mark loading as complete
                });
        } else {
            setLoading(false); // No refresh token, complete loading
        }
    }, []);

    const login = (access, refresh) => {
        setAccessToken(access);
        localStorage.setItem('refresh_token', refresh);
        setUser({ loggedIn: true });
    };

    const logout = () => {
        setAccessToken(null);
        localStorage.removeItem('refresh_token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {!loading && children} {/* Render children only after loading is complete */}
        </AuthContext.Provider>
    );
};
