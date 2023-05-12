import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

export function useRegister() {
   const { createUserEmailPassword, loginGoogle } = useAuthContext()
   const [user, setUser] = useState({ email: "", password: "" })
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const handleSinginEmailPassword = async (e) => {
      e.preventDefault()
      try {
         setLoading(true)
         await createUserEmailPassword(user.email, user.password)
         setLoading(true)
         navigate("/")
      } catch (e) {
         validateErrors(e.message)
      } finally {
         setLoading(false)
      }
   }

   const handleLoginGoogle = async () => {
      try {
         setError(null)
         await loginGoogle()
         navigate("/")
      } catch (e) {
         validateErrors(e.message)
      }
   }

   const handleChange = ({ target: { name, value } }) => {
      setUser({ ...user, [name]: value })
      setError(null)
   }

   const validateErrors = (errorMessage) => {
      switch (errorMessage) {
         case "Firebase: Error (auth/cancelled-popup-request)." || "Firebase: Error (auth/popup-closed-by-user).":
            break;

         case "Firebase: Error (auth/network-request-failed).":
            setError("Error en la conexión.")
            break;

         case "Firebase: Error (auth/missing-password).":
            setError("Contraseña vacía.")
            break;

         case "Firebase: Error (auth/missing-email).":
            setError("Email vacío")
            break;

         case "Firebase: Error (auth/invalid-email).":
            setError("Email inválido o vacío.")
            break

         case "Firebase: Error (auth/email-already-in-use).":
            setError("Ya hay un usuario con este email.")
            break

         case "Firebase: Password should be at least 6 characters (auth/weak-password).":
            setError("La contraseña debe tener más de 6 caracteres.")
            break
         case "Firebase: Error (auth/popup-blocked).":
            setError("Popup de Google bloqueado.")
            break

         default:
            setError(errorMessage)
            break;
      }
   }

   return {
      handleChange,
      handleSinginEmailPassword,
      handleLoginGoogle,
      error,
      loading
   }
}