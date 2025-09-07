"use client"

import { createContext, useContext, useState, useEffect } from "react"

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
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem("aurelia-user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password) => {
    // Mock authentication - in real app, this would call an API
    if (email && password) {
      const userData = {
        id: Date.now(),
        email,
        name: email.split("@")[0],
        joinDate: new Date().toISOString(),
        orders: [],
      }
      setUser(userData)
      localStorage.setItem("aurelia-user", JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: "Invalid credentials" }
  }

  const register = async (name, email, password) => {
    // Mock registration - in real app, this would call an API
    if (name && email && password) {
      const userData = {
        id: Date.now(),
        email,
        name,
        joinDate: new Date().toISOString(),
        orders: [],
      }
      setUser(userData)
      localStorage.setItem("aurelia-user", JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: "Please fill all fields" }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("aurelia-user")
  }

  const updateProfile = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem("aurelia-user", JSON.stringify(updatedUser))
  }

  const addOrder = (order) => {
    const updatedUser = {
      ...user,
      orders: [order, ...user.orders],
    }
    setUser(updatedUser)
    localStorage.setItem("aurelia-user", JSON.stringify(updatedUser))
  }

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    addOrder,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
