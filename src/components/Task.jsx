import PropTypes from "prop-types"
import { FormTask } from "./FormTask";
import { useFormTask } from "../hooks/useFormTask";
import { Popup } from "./Popup";
import { AnimatePresence } from "framer-motion";

export function Task({ id, title, description }) {

   const {
      editTask, error, handleChange,
      removeTask, edit, handleEdit,
      task, handlePopupDelete, popupDelete } = useFormTask({ id, title, description })

   return (
      <>
         <div className="task__content">
            <h3 className="task__title">{title}</h3>
            <div className="hr"></div>
            <p className="task__description">{description}</p>
            <div className="task__buttons">
               <button onClick={handlePopupDelete} className="btn btn-small btn-delete">
                  Eliminar
               </button>
               <button onClick={handleEdit} className="btn btn-small btn-success">
                  Editar
               </button>
            </div>
         </div>
         <AnimatePresence>
            {
               edit && (
                  <Popup
                     action={editTask}
                     actionText={"Guardar"}
                     funcCancel={handleEdit}>
                     <FormTask
                        error={error}
                        handleChange={handleChange}
                        task={task} />
                  </Popup>
               )
            }
            {
               popupDelete && (
                  <Popup
                     action={removeTask}
                     actionText={"Eliminar"}
                     isDelete={true}
                     funcCancel={handlePopupDelete}>
                     <>
                        <h3 className="task__title">¿Quieres eliminar la tarea?</h3>
                        <p className="task__description">El titulo de la tarea es <strong>&quot;{title}&quot;</strong></p>
                     </>
                  </Popup>
               )
            }
         </AnimatePresence>
      </>
   )
}

Task.propTypes = {
   id: PropTypes.string,
   title: PropTypes.string,
   description: PropTypes.string
}