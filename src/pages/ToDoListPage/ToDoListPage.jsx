import { getDocs, getDoc, collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc, } from "firebase/firestore";
import { useEffect, useState } from 'react'

import { auth } from '../../../firebase'
import { db } from "../../../firebase"

import { Trash, Lock, LockOpen, Square, CheckSquare, PencilSimpleLine} from "phosphor-react";

import style from './ToDoListPage.module.css'

export function ToDoListPage() {

    const [taskList, setTaskList] = useState([]);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDate, setNewTaskDate] = useState();
    const [newTaskDone, setNewTaskDone] = useState(false);
    const [isBlock, setIsBlock] = useState(false);

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
            Done: false,
            Block: false,
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
            console.error(err);
        }
         finally {
        }
    }   

    const handleFinishTask = async (id) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            await updateDoc(taskDoc, {Done: true});
        } catch (err) {
            console.error(err);
        }
    }

    const handleFinishTask = async (id) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            await updateDoc(taskDoc, {Done: true});
        } catch (err) {
            console.error(err);
        }
    }




    return(
        <div className={style.display}>

            <div>AQUI VAI FICAR OS E-MAILS</div>

            <div className={style.taskArea}>        
                <div className={style.newTask}>

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
                    <button 
                        onClick={onSubmitTask}
                        className={style.btnAddTask}>Salvar Tarefa</button>
                </div>

                {taskList.map((task) => (
                    <div 
                        key={task.id}
                        className={style.task}>
                        
                        <div className={style.header}>
                        <h1 
                            className={style.taskTitle}>{task.title}</h1>
                        <span
                            onClick={() => handleFinishTask(task.id)}
                            className={style.Done}>{newTaskDone? <CheckSquare className={style.checkDoneFinished}/> : <Square className={style.checkDone}/>}</span>
                        </div>

                        <span 
                            className={style.taskDate}>Conclusão aguardada: {task.date}</span>

                        <span 
                            className={style.taskDescription}>{task.description}</span>

                        
                        <div className={style.btnBox}>

                            <button 
                                onClick={() => deleteTask(task.id)}
                                className={style.btn}><PencilSimpleLine/></button>

                            <button 
                                onClick={() => deleteTask(task.id)}
                                className={style.btn}><Trash/></button>

                            <button 
                                onClick={console.log("block")}
                                className={style.btn}>
                                    {isBlock? <Lock/> : <LockOpen/>}                                
                            </button>
                        </div>
                </div>
            ))}
            </div>
        </div>
    )
}