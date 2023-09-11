import { doc, updateDoc, } from "firebase/firestore";
import { Check, X} from "phosphor-react";

import { db } from "../../../firebase"
import useCurrentDate from '../../hooks/useToday/useToday';

import style from './editTask.module.css'

const EditTask = ({ editingTask, setEditingTask }) => {

    const currentDate = useCurrentDate();

    const handleSaveEdit = async () => {
        event.preventDefault();
        try {
          const taskDoc = doc(db, "tasks", editingTask.id);
          await updateDoc(taskDoc, {
            title: editingTask.title,
            description: editingTask.description,
            date: editingTask.date,
          });
          setEditingTask(null);
        } catch (err) {
          console.error(err);
          setEditingTask(null);
        }
    };

    return(
        <div> 
            {editingTask && (
                <div className={style.overlay}>
                    <div className={style.blurbackground}/>
                    <div className={style.modal}>
                        <form onSubmit={handleSaveEdit}>
                            <h2>Editar Tarefa</h2>
                            <div className={style.inputBox  }>
                                
                                    <input
                                        type="text"
                                        required
                                        placeholder="Novo Título"
                                        value={editingTask.title}
                                        onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                                    />
                                    <textarea
                                        type="text"
                                        maxLength="400"
                                        required
                                        placeholder="Nova Descrição"
                                        value={editingTask.description}
                                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                                    />
                                    <input
                                        type="date"
                                        required
                                        min={currentDate}
                                        placeholder="Nova Data"
                                        value={editingTask.date}
                                        onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
                                    />
                                
                            </div>
                            
                            <div className={style.btnBox}>
                                <button 
                                    type="submit"
                                    className={style.btn}>
                                        <Check/>
                                </button>
                                <button 
                                    onClick={() => setEditingTask(null)}
                                    className={style.btn}>
                                        <X/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EditTask