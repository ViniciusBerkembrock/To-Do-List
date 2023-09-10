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

    const [searchTerm, setSearchTerm] = useState('');
    const [taskListFiltered, setTaskListFiltered] = useState([]);
    
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

    useEffect(() => {
        if (searchTerm) {
            setTaskListFiltered(
              taskList.filter((task) =>
                task.title.toLowerCase().includes(searchTerm.toLowerCase())
              )
            );
        } else {
            setTaskListFiltered(taskList);
        }
    },[searchTerm, taskList]);
    
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

                <div className={style.searchBox}>
                    <h1>Pesquisar Tarefa</h1>
                    <input 
                        type="text" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder='Titulo da tarefa...'/>
                </div>

                <Task taskList={taskListFiltered}/>

            </div>
        </div>
    )
}