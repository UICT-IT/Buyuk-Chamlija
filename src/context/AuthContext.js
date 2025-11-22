import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    const register = (name, email, password) => {
        // Check if user already exists
        if (registeredUsers.find(u => u.email === email)) {
            return { success: false, message: 'User already exists with this email.' };
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password,
            phone: '', // Placeholder
            location: 'South Africa',
            memberSince: new Date().toLocaleDateString(),
            avatar: 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
        };

        setRegisteredUsers([...registeredUsers, newUser]);
        return { success: true, message: 'Registration successful! Please log in.' };
    };

    const login = (email, password) => {
        const foundUser = registeredUsers.find(u => u.email === email && u.password === password);
        if (foundUser) {
            setUser(foundUser);
            return { success: true };
        }
        return { success: false, message: 'Invalid email or password.' };
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
