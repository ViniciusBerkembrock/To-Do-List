import { useEffect, useState } from 'react'
import { auth } from '../../../firebase'
import { db } from "../../../firebase"
import { getDocs, getDoc, collection, addDoc, doc, deleteDoc,onSnapshot } from "firebase/firestore";


import style from './ToDoListPage.module.css'

export function ToDoListPage() {

    const [taskList, setTaskList] = useState([]);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDate, setNewTaskDate] = useState();
    const [newTaskDone, setNewTaskDone] = useState(false);

    const taskCollectionRef = collection(db, "tasks");


    useEffect(() => {

        const unsubscribe = onSnapshot(taskCollectionRef, (snapshot) => {
          const updatedMovies = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTaskList(updatedMovies);
        });
    
        return () => unsubscribe();
    }, []);
    
    const onSubmitTask = async () => {
    try{
        await addDoc(taskCollectionRef, {
            title: newTaskTitle,
            description: newTaskDescription,
            date: newTaskDate,
            Done: newTaskDone
        });
    } catch(err){
        console.error(err)
    }
    }

    const deleteTask = async (id) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            await deleteDoc(taskDoc);
        } catch (err) {
            console.error(err)
        }
         finally {
        }
    }   



    return(
        <div className={style.display}>
            <div>AQUI VAI FICAR OS E-MAILS</div>

            <div className={style.taskBox}>        
                <div className={style.task}>

                    <input 
                        type="text" 
                        placeholder="Título"
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        />

                     <input 
                        type="text" 
                        placeholder="Descrição"
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        />  
                    <input 
                        type="date" 
                        placeholder="Descrição"
                        onChange={(e) => setNewTaskDate(e.target.value)}
                        />        
                    <input 
                        type="checkbox" 
                        checked={newTaskDone}
                        onChange={(e) => setNewTaskDone(e.target.checked)}
                        />
                    <label htmlFor="">Finalizado</label>
                    <button onClick={onSubmitTask}>Salvar Tarefa</button>
                </div>

                {taskList.map((task) => (
                    <div 
                        key={task.id}
                        className={style.task}>

                        <h1 
                            className={style.taskTitle}>{task.title}</h1>

                        <span 
                            className={style.taskDescription}>Descrição: {task.description}</span>

                        <span 
                            className={style.taskDate}>{task.date}</span>

                        <h3 
                            className={style.done}>Finalizado: {task.done == true? "Sim" : "Não"}</h3>

                        <button 
                            onClick={() => deleteTask(task.id)}>Deletar</button>

                        <button 
                            onClick={() => deleteTask(task.id)}>Block</button>
                </div>
            ))}
            </div>
        </div>
    )
}