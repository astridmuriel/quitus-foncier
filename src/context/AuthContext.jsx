import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check local storage or API for existing session
        const storedUser = localStorage.getItem('quitus_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password, userType = 'particulier') => {
        // Mock login logic
        console.log("Logging in with", email, password, "as", userType);
        const mockUser = {
            id: '1',
            name: 'Jean-Pierre Mukendi',
            email,
            role: userType,
            userType: userType
        };
        setUser(mockUser);
        localStorage.setItem('quitus_user', JSON.stringify(mockUser));
        return mockUser;
    };

    const register = async (name, email, password) => {
        // Mock register logic
        console.log("Registering", name, email, password);
        const mockUser = { id: '1', name, email, role: 'user' };
        setUser(mockUser);
        localStorage.setItem('quitus_user', JSON.stringify(mockUser));
        return mockUser;
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem('quitus_user');
    };

    const value = {
        user,
        login,
        register,
        logout,
        loading
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
