import React, { createContext, useState, useContext, useEffect } from 'react';

import { generateUserQR } from '../utils/qrHelpers';

const AuthContext = createContext();

const { auth, db } = require('../config/firebaseConfig');
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Listen for auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // User is signed in, fetch additional details from Firestore
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    setUser({ ...userDoc.data(), uid: firebaseUser.uid });
                } else {
                    // Fallback if doc doesn't exist (shouldn't happen in normal flow)
                    setUser({
                        uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        name: 'User', // Default
                        isSeller: false
                    });
                }
            } else {
                // User is signed out
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const register = async (name, email, password, isSeller = false) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            const userId = firebaseUser.uid;
            // Generate secure QR with real data
            const userQR = generateUserQR(userId, name, email);

            const newUser = {
                id: userId, // Keep 'id' for compatibility with existing code
                uid: userId,
                name,
                email,
                phone: '',
                location: 'South Africa',
                memberSince: new Date().toLocaleDateString(),
                avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`,
                userQR,
                isSeller
            };

            // Save user details to Firestore
            await setDoc(doc(db, 'users', userId), newUser);

            // State update handled by onAuthStateChanged
            return {
                success: true,
                message: 'Registration successful!',
                userQR: newUser.userQR
            };
        } catch (error) {
            console.error("Registration Error:", error);
            let errorMessage = 'Registration failed.';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'Email is already in use.';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters.';
            }
            return { success: false, message: errorMessage };
        }
    };

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            return { success: true };
        } catch (error) {
            console.error("Login Error:", error);
            let errorMessage = 'Login failed.';
            if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
                errorMessage = 'Invalid email or password.';
            }
            return { success: false, message: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    const getUserById = async (id) => {
        // Fetch user from Firestore by ID (useful for scanner)
        try {
            const userDoc = await getDoc(doc(db, 'users', id));
            if (userDoc.exists()) {
                return userDoc.data();
            }
            return null;
        } catch (error) {
            console.error("Error fetching user:", error);
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, register, login, logout, getUserById, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
