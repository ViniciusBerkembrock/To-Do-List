import { useContext, useState } from 'react'
import { getDoc, doc, deleteDoc, updateDoc, } from "firebase/firestore";
import moment from 'moment'

import { Trash, Lock, LockOpen, Square, CheckSquare, PencilSimpleLine, Check, X} from "phosphor-react";

import AuthContext from "../../context/AuthContext";
import { db } from "../../../firebase"
import EditTask from "../editTask/EditTask";
// import useGetUsers from '../../hooks/useGetUsers/useGetUsers'

import style from './task.module.css'

const Task = ({ taskList }) => {

    const { currentUser } = useContext(AuthContext);
    // const { userList } = useGetUsers();

    

    const [editingTask, setEditingTask] = useState(null);

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

    return(
        <div>
            {taskList.map((task) => (
                <div 
                    key={task.id}
                    className={style.task}>
                    
                    <div className={style.header}>
                        <div className={style.headerMainInfo}>
                        <img className={style.avatar} src={task.photoURL} alt="" />
                        <h1 className={style.taskTitle}>{task.title}</h1>

                        </div>
                        <button
                            onClick={() => handleFinishTask(task.id)}
                            disabled={task.uid !== currentUser.uid && task.block == true}
                            className={style.btnDone}>
                                {task.done? <CheckSquare className={style.checkDoneFinished}/> 
                                : <Square className={style.checkDone}/>}
                        </button>
                    </div>

                    <span 
                        className={style.taskDate}>Conclusão aguardada: {moment(task.date).format('L')}</span>
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

            <EditTask editingTask={editingTask} setEditingTask={setEditingTask}/>
            
        </div>
    )
}

export default Task



