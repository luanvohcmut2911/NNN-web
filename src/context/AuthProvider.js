import { createContext, useState } from "react"

export const AuthContext = createContext();

export default function AuthProvider({children}) {
  const [user, setUser] = useState(null); // get user info includes name, photoURL, nnnDay, currentStreak
  return (
    <AuthContext.Provider
      value={{user, setUser}}
    >
      {children}
    </AuthContext.Provider>
  )
}