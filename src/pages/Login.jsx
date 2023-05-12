import { Link } from "react-router-dom"
import { Error } from "../components/Error"
import { useLogin } from "../hooks/useLogin"
import { FormLogin } from "../components/FormLogin"
import { AnimatePresence, motion } from "framer-motion"

export function Login() {
   const { handleLoginEmailPassword, handleChange, handleLoginGoogle, error, loading } = useLogin()

   return (
      <motion.div className="container"
         initial={{
            opacity: 0
         }}
         animate={{
            opacity: 1
         }}>
         <main
            className="container-app">
            <h1 className="app__title">Log In</h1>
            <FormLogin
               handleChange={handleChange}
               handleLoginGoogle={handleLoginGoogle}
               handleSubmid={handleLoginEmailPassword}
               loading={loading} />
            <div className="login-links">
               <Link
                  to="/forgot-password">
                  ¿Olvidaste tu contraseña?
               </Link>
               <p className="login-links__register">¿No tienes cuenta? <Link to="/register">Abrir cuenta</Link></p>
            </div>
         </main>
         <AnimatePresence>
            {error && <Error message={error} />}
         </AnimatePresence>
      </motion.div>
   )
}