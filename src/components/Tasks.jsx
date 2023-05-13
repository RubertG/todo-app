import PropTypes from "prop-types"
import { Task } from "./Task"
import { AnimatePresence, motion } from "framer-motion"

export function Tasks({ tasks }) {

   if (window.innerWidth < 768) return (
      <ul
         className="tasks">
         <AnimatePresence>
            {
               tasks.map(({ id, title, description }) => {
                  return (
                     <li
                        className="container-app task"
                        key={id}>
                        <Task id={id} title={title} description={description} />
                     </li>
                  )
               })
            }
         </AnimatePresence>
      </ul>
   )

   return (
      <motion.ul
         className="tasks"
         layout>
         <AnimatePresence>
            {
               tasks.map(({ id, title, description }) => {
                  return (
                     <motion.li
                        className="container-app task"
                        key={id}
                        initial={{
                           opacity: 0,
                           borderRadius: 5,
                           border: "2px solid var(--text-principal)",
                           boxShadow: "-5px 5px 0px var(--text-light)"

                        }}
                        animate={{
                           opacity: 1
                        }}
                        exit={{
                           opacity: 0,
                           transition: { duration: .2 }
                        }}
                        layoutId={id}>
                        <Task id={id} title={title} description={description} />
                     </motion.li>
                  )
               })
            }
         </AnimatePresence>
      </motion.ul>
   )
}

Tasks.propTypes = {
   tasks: PropTypes.array.isRequired
}