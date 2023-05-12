import PropTypes from "prop-types"
import { Task } from "./Task"
import { AnimatePresence, motion } from "framer-motion"

export function Tasks({ tasks }) {

   return (
      <motion.ul className="tasks" layout>
         <AnimatePresence>
            {
               tasks.map(({ id, title, description }) => {
                  return (
                     <motion.li
                        className="container-app task"
                        key={id}
                        initial={{
                           opacity: 0
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