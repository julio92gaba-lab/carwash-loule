import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null)

  const signIn = async (email) => {
    setSession({ user: { email: email || 'admin@carwashloule.pt' } })
    return { error: null }
  }

  const signOut = async () => setSession(null)

  return (
    <AuthContext.Provider value={{ session, loading: false, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
