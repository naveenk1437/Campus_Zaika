// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { auth } from "../firebase";

// Create context
const AuthContext = createContext();

// Auth provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Authenticated user
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Subscribe to Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
      (error) => {
        console.error("Auth state change error:", error);
        setUser(null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Update user profile (e.g., photoURL)
  const updateUserProfile = async (profile) => {
    if (!auth.currentUser) return;

    try {
      await updateProfile(auth.currentUser, profile);
      // Refresh the user state so Navbar re-renders
      setUser({ ...auth.currentUser });
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, updateUserProfile }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
