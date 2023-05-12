import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useEffect, useState } from "react"
import { auth } from "../firebase/config"

export function useAuth() {
   const [user, setUser] = useState(null)
   const [loading, setLoading] = useState(true)

   useEffect(() => {
      onAuthStateChanged(auth, userCurrent => {
         setUser(userCurrent)
         setLoading(false)
      })
   })

   const createUserEmailPassword = (email, password) =>
      createUserWithEmailAndPassword(auth, email, password)

   const loginEmailPassword = (email, password) => signInWithEmailAndPassword(auth, email, password)

   const loginGoogle = () => {
      const googleProvider = new GoogleAuthProvider()
      return signInWithPopup(auth, googleProvider)
   }

   const resetPassword = (email) => sendPasswordResetEmail(auth, email)

   return {
      user,
      loading,
      createUserEmailPassword,
      loginEmailPassword,
      loginGoogle,
      resetPassword
   }
}