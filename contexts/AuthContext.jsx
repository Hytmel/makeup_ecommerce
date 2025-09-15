"use client"

import { createContext, useContext, useState, useEffect } from "react"
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth"
import { auth } from "../lib/firebase"

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (fbUser) => {
      setUser(fbUser)
      setIsLoading(false)
    })
    return () => unsub()
  }, [])

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const register = async (name, email, password) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      if (name) {
        await updateProfile(cred.user, { displayName: name })
      }
      return { success: true }
    } catch (err) {
      return { success: false, error: err.message }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
    } catch (_) {
      // ignore
    }
  }

  const updateProfileLocal = async (updates) => {
    // Optional: you can expand to persist additional profile fields in Firestore users/{uid}
    try {
      if (auth.currentUser && updates.displayName) {
        await updateProfile(auth.currentUser, { displayName: updates.displayName })
        setUser({ ...auth.currentUser })
      }
    } catch (_) {}
  }

  const addOrder = (_order) => {
    // Placeholder for future: write order to Firestore
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile: updateProfileLocal,
    addOrder,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
