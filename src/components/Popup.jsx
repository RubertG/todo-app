import Proptype from "prop-types"
import { motion } from "framer-motion"

export function Popup({ children, funcCancel, action, actionText, isDelete = false }) {

   const classNameButton = isDelete ? "btn-delete" : ""

   return (
      <motion.div
         className="popup container"
         initial={{
            opacity: 0
         }}
         animate={{
            opacity: 1
         }}
         exit={{
            opacity: 0
         }}>
         <motion.div
            className="container-app"
            initial={{
               scale: 0
            }}
            animate={{
               scale: 1
            }}
            exit={{
               scale: 0
            }}>
            {children}
            <div className="container-buttons">
               <button onClick={funcCancel} className="btn btn-small">Cancelar</button>
               <button onClick={action} className={`btn btn-small ${classNameButton}`}>{actionText}</button>
            </div>
         </motion.div>
      </motion.div>
   )
}

Popup.propTypes = {
   children: Proptype.object,
   funcCancel: Proptype.func,
   action: Proptype.func,
   actionText: Proptype.string,
   isDelete: Proptype.bool
}