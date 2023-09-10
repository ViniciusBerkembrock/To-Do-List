import { getDocs, getDoc, collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc, } from "firebase/firestore";
import { useEffect, useState } from 'react'

import { auth } from '../../../firebase'
import { db } from "../../../firebase"

import { Trash, Lock, LockOpen, Square, CheckSquare, PencilSimpleLine, Check, X} from "phosphor-react";

import style from './ToDoListPage.module.css'

export function ToDoListPage() {

    const [taskList, setTaskList] = useState([]);

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDate, setNewTaskDate] = useState();
    const [newTaskDone, setNewTaskDone] = useState(false);
    const [isBlock, setIsBlock] = useState(false);

    const [editingTask, setEditingTask] = useState(null);
    
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
            done: false,
            block: false,
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
            const task = await getDoc(taskDoc);
            await updateDoc(taskDoc, {done: !task.data().done});
        } catch (err) {
            console.error(err);
        }
    }

    
    const handleSaveEdit = async () => {
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
        }
    };

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
                            className={style.Done}>{task.done? <CheckSquare className={style.checkDoneFinished}/> : <Square className={style.checkDone}/>}</span>
                        </div>

                        <span 
                            className={style.taskDate}>Conclusão aguardada: {task.date}</span>

                        <span 
                            className={style.taskDescription}>{task.description}</span>

                        
                        <div className={style.btnBox}>

                            <button 
                                onClick={() => setEditingTask(task)}
                                className={style.btn}><PencilSimpleLine/></button>

                            <button 
                                onClick={() => deleteTask(task.id)}
                                className={style.btn}><Trash/></button>

                            <button 
                                onClick={() => setEditingTask(task)}
                                className={style.btn}>
                                    {isBlock? <Lock/> : <LockOpen/>}                                
                            </button>
                        </div>
                </div>
            ))}


            {editingTask && (
                <div className={style.overlay}>
                    <div className={style.blurbackground}/>
                    <div className={style.modal}>
                        <h2>Editar Tarefa</h2>
                        <div className={style.inputBox  }>
                            <input
                                type="text"
                                placeholder="Novo Título"
                                value={editingTask.title}
                                onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Nova Descrição"
                                value={editingTask.description}
                                onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                            />
                            <input
                                type="date"
                                placeholder="Nova Data"
                                value={editingTask.date}
                                onChange={(e) => setEditingTask({ ...editingTask, date: e.target.value })}
                            />
                        </div>
                        
                        <div className={style.btnBox}>
                            <button 
                                onClick={handleSaveEdit}
                                className={style.btn}
                            ><Check/></button>
                            <button 
                                onClick={() => setEditingTask(null)}
                                className={style.btn}><X/></button>
                        </div>
                    </div>
                </div>
            )}

                    

            </div>
        </div>
    )
}