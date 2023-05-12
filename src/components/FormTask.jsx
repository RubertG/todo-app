import PropType from "prop-types"
import { AnimatePresence, motion } from "framer-motion"

export function FormTask({ children, handleSubmit, task, handleChange, error, className = "" }) {
   return (
      <form onSubmit={(e) => handleSubmit(e)} className={"app__form " + className}>
         <label
            htmlFor="title"
            className="app__input task-input">
            <p className="input__text">Título</p>
            <input
               type="text"
               name="title"
               defaultValue={task.title}
               onChange={e => handleChange(e)}
               id="title" />
            <AnimatePresence>
               {error[0] && (
                  <motion.p
                     className="form__error"
                     initial={{
                        opacity: 0
                     }}
                     animate={{
                        opacity: 1
                     }}
                     exit={{
                        opacity: 0
                     }}
                     transition={{
                        duration: .1
                     }}>
                     {error[0]}
                  </motion.p>
               )}
            </AnimatePresence>
         </label>
         <label
            htmlFor="description"
            className="app__textarea task-input">
            <p className="input__text">Descripción</p>
            <textarea
               type="text"
               name="description"
               defaultValue={task.description}
               onChange={e => handleChange(e)}
               id="description" />
            <AnimatePresence>
               {error[1] && (
                  <motion.p
                     className="form__error"
                     initial={{
                        opacity: 0
                     }}
                     animate={{
                        opacity: 1
                     }}
                     exit={{
                        opacity: 0
                     }}
                     transition={{
                        duration: .1
                     }}>
                     {error[1]}
                  </motion.p>
               )}
            </AnimatePresence>
         </label>
         {children}
      </form >
   )
}

FormTask.propTypes = {
   handleSubmit: PropType.func,
   handleChange: PropType.func,
   task: PropType.object,
   error: PropType.array,
   children: PropType.element,
   className: PropType.string
}