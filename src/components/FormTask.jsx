import PropType from "prop-types"
import { AnimatePresence, motion } from "framer-motion"

export function FormTask({ children, handleSubmit, task, handleChange, error, className = "" }) {
   return (
      <form onSubmit={(e) => handleSubmit(e)} className={"app__form " + className}>
         <motion.label
            htmlFor="title"
            className="app__input task-input"
            initial={{
               y: -10,
               opacity: 0
            }}
            animate={{
               y: 0,
               opacity: 1,
               transition: { delay: .2 }
            }}>
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
         </motion.label>
         <motion.label
            htmlFor="description"
            className="app__textarea task-input"
            initial={{
               y: -10,
               opacity: 0
            }}
            animate={{
               y: 0,
               opacity: 1,
               transition: { delay: .3 }
            }}>
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
         </motion.label>
         <motion.div
            initial={{
               y: -10,
               opacity: 0
            }}
            animate={{
               y: 0,
               opacity: 1,
               transition: { delay: .4 }
            }}>
            {children}
         </motion.div>
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