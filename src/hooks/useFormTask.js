import { useState } from "react"
import { useAuthContext } from "./useAuthContext"
import { addDoc, collection, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase/config"

export function useFormTask({ id, title, description }) {
   const { user } = useAuthContext()
   const [edit, setEdit] = useState(false)
   const [popupDelete, setPopupDelete] = useState(false)
   const [task, setTask] = useState(
      title && description ?
         { title, description, uid: user.uid }
         : { title: "", description: "", uid: user.uid }
   )
   const [error, setError] = useState([null, null])

   const handlePopupDelete = () => {
      setPopupDelete(!popupDelete)
   }

   const removeTask = async () => {
      await deleteDoc(doc(db, "tasks", id));
   }

   const addTask = async (e) => {
      e.preventDefault()
      if (validationErrors()) {
         const auxTask = { ...task, dateCreate: new Date().getTime() }
         setTask(auxTask)
         e.target.title.value = ""
         e.target.description.value = ""
         await addDoc(collection(db, "tasks"), auxTask)
      }
   }

   const handleEdit = () => {
      if (edit) {
         setError([null, null])
         editTask()
      } else {
         const auxEdit = !edit
         setEdit(auxEdit)
      }
   }

   const editTask = async () => {
      if (validationErrors()) {
         try {
            setEdit(false)
            await updateDoc(doc(db, "tasks", id), task)
         } catch (e) {
            throw new Error("Task not found")
         }
         setEdit(false)
      }
   }

   const validationErrors = () => {
      const auxError = [null, null]
      if (task.title.length < 4) {
         auxError[0] = "Debe tener más de 3 caracteres"
         setError(auxError)
      }
      if (task.description.length < 6) {
         auxError[1] = "Debe tener más de 5 caracteres"
         setError(auxError)
      }
      if (!auxError[0] && !auxError[1]) return true
      else return false
   }

   const handleChange = ({ target: { name, value } }) => {
      setError([null, null])
      const auxTask = { ...task, [name]: value }
      setTask(auxTask)
   }

   return {
      handleChange,
      error,
      task,
      handleEdit,
      removeTask,
      edit,
      addTask,
      popupDelete,
      handlePopupDelete,
      editTask
   }
}