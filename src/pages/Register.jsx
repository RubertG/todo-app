import { Link } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { Error } from "../components/Error";
import { FormLogin } from "../components/FormLogin";
import { AnimatePresence, motion } from "framer-motion";

export function Register() {
   const { error, handleChange, handleLoginGoogle, handleSinginEmailPassword, loading } = useRegister()

   return (
      <motion.div
         className="container"
         initial={{
            opacity: 0
         }}
         animate={{
            opacity: 1
         }}>
         <main className="container-app">
            <h1 className="app__title">Registrar</h1>
            <FormLogin
               handleChange={handleChange}
               handleSubmid={handleSinginEmailPassword}
               loading={loading}
               handleLoginGoogle={handleLoginGoogle}
               isRegister={true} />
            <div className="login-links">
               <p>
                  ¿Ya tienes cuenta? <Link to="/login">Ingresar</Link>
               </p>
            </div>
         </main>
         <AnimatePresence>
            {error && <Error message={error} />}
         </AnimatePresence>
      </motion.div>
   )
}