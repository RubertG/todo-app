import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../hooks/useAuthContext"
import { useState } from "react"

export function useLogin() {
   const { loginEmailPassword, loginGoogle } = useAuthContext()
   const [user, setUser] = useState({ email: "", password: "" })
   const [error, setError] = useState(null)
   const [loading, setLoading] = useState(false)
   const navigate = useNavigate()

   const handleLoginEmailPassword = async (e) => {
      e.preventDefault()
      try {
         setLoading(true)
         await loginEmailPassword(user.email, user.password)
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
         case "Firebase: Error (auth/wrong-password).":
            setError("Contraseña incorrecta.")
            break;

         case "Firebase: Error (auth/user-not-found).":
            setError("Usuario inexistente.")
            break;

         case "Firebase: Error (auth/cancelled-popup-request).":
            break;

         case "Firebase: Error (auth/missing-password).":
            setError("Contraseña vacía")
            break

         case "Firebase: Error (auth/invalid-email).":
            setError("Email inválido o vacío.")
            break

         case "Firebase: Error (auth/popup-blocked).":
            setError("Popup de Google bloqueado.")
            break

         case "Firebase: Error (auth/popup-closed-by-user).":
            setError("Popup de Google cerrado por el usuario.")
            break

         case "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).":
            setError("Acceso a la cuenta bloqueado por muchos intentos fallidos.")
            break

         default:
            setError(errorMessage)
            break;
      }
   }

   return {
      handleChange,
      handleLoginEmailPassword,
      handleLoginGoogle,
      error,
      loading
   }
}