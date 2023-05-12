import iconGoogle from "../assets/icon-google.svg"
import { Spinner } from "./Spinner"
import PropType from "prop-types"

export function FormLogin({ handleSubmid, handleChange, loading, handleLoginGoogle, isRegister = false }) {
   return (
      <form onSubmit={e => handleSubmid(e)} className="app__form">
         <label htmlFor="email" className="app__input">
            <p className="input__text">Email</p>
            <input
               type="email"
               name="email"
               onChange={e => handleChange(e)}
               id="email" />
         </label>
         <label htmlFor="password" className="app__input">
            <p className="input__text">Contraseña</p>
            <input
               type="password"
               name="password"
               onChange={e => handleChange(e)}
               id="password" />
         </label>
         <div className="container-buttons">
            <button type="submit" className="btn">
               <p
                  className={`${loading ? "text-hidden" : ""}`}>
                  {isRegister ? "Crear cuenta" : "Iniciar sesión"}
               </p>
               <Spinner
                  className={`spinner-button ${loading ? "active" : ""}`} />
            </button>
            <button type="button" onClick={handleLoginGoogle} className="btn btn-google">
               <img src={iconGoogle} alt={"Icon Google"} />
            </button>
         </div>
      </form>
   )
}

FormLogin.propTypes = {
   handleChange: PropType.func,
   handleLoginGoogle: PropType.func,
   loading: PropType.bool,
   isRegister: PropType.bool,
   handleSubmid: PropType.func,
}