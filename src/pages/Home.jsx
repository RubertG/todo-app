import { signOut } from "firebase/auth"
import { auth, db } from "../firebase/config"
import { useEffect, useState } from "react"
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore"
import { Tasks } from "../components/Tasks"
import { FormTask } from "../components/FormTask"
import { useFormTask } from "../hooks/useFormTask"
import { useAuthContext } from "../hooks/useAuthContext"
import { motion } from "framer-motion"

export function Home() {
   const logout = async () => await signOut(auth)
   const { addTask, error, handleChange, task } = useFormTask({})
   const { user } = useAuthContext()
   const [tasks, setTasks] = useState()

   useEffect(() => {
      if (user) {
         const q = query(
            collection(db, "tasks"),
            where("uid", "==", user.uid),
            orderBy("dateCreate"));
         onSnapshot(q, (querySnapshot) => {
            const auxTasks = [];
            querySnapshot.forEach((doc) => {
               const task = doc.data()
               auxTasks.push({ ...task, id: doc.id });
            });
            setTasks(auxTasks)
         });
      }
   }, [user])

   return (
      <motion.div className="container"
         initial={{
            opacity: 0
         }}
         animate={{
            opacity: 1
         }}>
         <button
            onClick={logout}
            className="btn btn-logout btn-delete">
            Cerrar sesión
         </button>
         <main
            className="container-app app-todo">
            <h1
               className="app__title">
               TO DO
            </h1>
            <FormTask
               className="home-form"
               error={error}
               handleChange={handleChange}
               handleSubmit={addTask}
               task={task}>
               <div className="container-buttons">
                  <button type="submit" className="btn">
                     Crear tarea
                  </button>
               </div>
            </FormTask>
         </main>
         <section className="container-tasks">
            {
               tasks && <Tasks tasks={tasks} />
            }
         </section>
      </motion.div>
   )
}