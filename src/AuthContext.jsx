import React, { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from './supabaseClient'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession()
      console.log(data);
      
      if (error) {
        console.error('Error fetching session:', error)
      } else if (data.session) {
        setUser(data.session.user || null)
      }

      setLoading(false)
    }

    getSession()

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
      options: {
        expiresIn: '24h',  // Set the session to expire in 24 hours
      },
    })

    if (error) {
      console.error('Error during login:', error)
      return { error }
    }

    if (data?.user) {
      setUser(data.user)
    }

    return { data, error }
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error('Error during logout:', error)
      return error
    }

    setUser(null)
    return null
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
