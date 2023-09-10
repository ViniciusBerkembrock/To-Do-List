import { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot } from "firebase/firestore";

import { db } from "../../../firebase"
import useGetUsers from '../../hooks/useGetUsers/useGetUsers'
import TeamList from "../../components/teamList/TeamList"
import Task from "../../components/task/Task";

import style from './ToDoListPage.module.css'

export function ToDoListPage() {
    
    const { userList } = useGetUsers();
    const taskCollectionRef = collection(db, "tasks");

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDate, setNewTaskDate] = useState();
    
    const [taskList, setTaskList] = useState([]);
    
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
                block: false
            });
        } catch(err){
            console.error(err)
        }
    }

    return(
        <div className={style.display}>
            <div className={style.teamList}>
                <TeamList users={userList}/>
            </div>

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
                        className={style.btnAddTask}>Salvar Tarefa
                    </button>
                </div>

                <Task taskList={taskList}/>  

            </div>
        </div>
    )
}