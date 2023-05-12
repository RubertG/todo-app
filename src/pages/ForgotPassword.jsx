import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { Error } from "../components/Error";
import { Spinner } from "../components/Spinner";
import { AnimatePresence, motion } from "framer-motion";

export function ForgotPassword() {

   const { resetPassword } = useAuth()
   const [error, setError] = useState(null)
   const [send, setSend] = useState(false)
   const [loading, setLoading] = useState(false)

   const handleResetPassword = async (e) => {
      e.preventDefault()
      const { email } = e.target
      if (!email.value) return setError("Escribe un correo.")
      try {
         setLoading(true)
         await resetPassword(email.value)
         setSend(true)
         setLoading(false)
         setTimeout(() => setSend(false), 4000)
      } catch (e) {
         validationErrors(e.message)
         setSend(false)
         setLoading(false)
      }
   }

   const validationErrors = (message) => {
      switch (message) {
         case "Firebase: Error (auth/invalid-email).":
            setError("Email invalido.")
            break;

         case "Firebase: Error (auth/user-not-found).":
            setError("Usuario inexistente")
            break

         default:
            setError(message)
            break;
      }
   }

   const handleChange = () => {
      setError(null)
   }

   return (
      <motion.div className="container"
         initial={{
            opacity: 0
         }}
         animate={{
            opacity: 1
         }}>
         <main className="container-app">
            <h1 className="app__title small">Recuperar contraseña</h1>
            <form onSubmit={e => handleResetPassword(e)} className="app__form">
               <label htmlFor="email" className="app__input">
                  <p className="input__text">Email</p>
                  <input
                     type="email"
                     name="email"
                     onClick={handleChange}
                     id="email" />
               </label>
               <div className="container-buttons">
                  <button type="submit" className="btn">
                     <p
                        className={`${loading ? "text-hidden" : ""}`}>
                        Enviar código
                     </p>
                     <Spinner
                        className={`spinner-button ${loading ? "active" : ""}`} />
                  </button>
               </div>
            </form>
            <div className="fp-links">
               <Link
                  to="/login"
                  className="a-hover">
                  Ingresar
               </Link>
               <Link
                  to="/register"
                  className="a-hover">
                  Abrir cuenta
               </Link>
            </div>
         </main>
         <AnimatePresence>
            {error && <Error message={error} />}
            {send &&
               <motion.p
                  className="send-email"
                  initial={{
                     opacity: 0
                  }}
                  animate={{
                     opacity: 1
                  }}
                  exit={{
                     opacity: 0,
                     transition: { duration: .2 }
                  }}>
                  Hemos enviado a tu email un link para cambiar tu contraseña
               </motion.p>}
         </AnimatePresence>
      </motion.div>
   )
}