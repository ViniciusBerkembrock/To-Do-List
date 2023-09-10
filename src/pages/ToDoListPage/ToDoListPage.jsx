import { getDocs, getDoc, collection, addDoc, doc, deleteDoc, onSnapshot, updateDoc, } from "firebase/firestore";
import { useContext, useEffect, useState } from 'react'

import { auth } from '../../../firebase'
import { db } from "../../../firebase"

import { Trash, Lock, LockOpen, Square, CheckSquare, PencilSimpleLine, Check, X} from "phosphor-react";

import style from './ToDoListPage.module.css'
import AuthContext from "../../context/AuthContext";

export function ToDoListPage() {

    const { currentUser } = useContext(AuthContext);

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
            uid: currentUser.uid
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

    const handleBlockTask = async (id) => {
        try {
            const taskDoc = doc(db, "tasks", id);
            const task = await getDoc(taskDoc);
            await updateDoc(taskDoc, {block: !task.data().block});
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
          setEditingTask(null);
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
                        <button
                            onClick={() => handleFinishTask(task.id)}
                            disabled={task.uid !== currentUser.uid && task.block == true}
                            className={style.btnDone}>
                                {task.done? <CheckSquare className={style.checkDoneFinished}/> 
                                : <Square className={style.checkDone}/>}
                        </button>
                        </div>

                        <span 
                            className={style.taskDate}>Conclusão aguardada: {task.date}</span>

                        <span 
                            className={style.taskDescription}>{task.description}</span>

                        
                        <div className={style.btnBox}>

                            <button 
                                disabled={task.uid !== currentUser.uid && task.block == true}
                                onClick={() => setEditingTask(task)}
                                className={style.btn}><PencilSimpleLine/></button>

                            <button 
                                disabled={task.uid !== currentUser.uid && task.block == true}
                                onClick={() => deleteTask(task.id)}
                                className={style.btn}><Trash/></button>

                            <button 
                                disabled={task.uid !== currentUser.uid}
                                onClick={() => handleBlockTask(task.id)}
                                className={style.btn}>
                                    {task.block? <Lock className={style.lock}/> : <LockOpen/>}                                
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