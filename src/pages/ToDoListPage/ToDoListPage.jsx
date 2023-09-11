import { useEffect, useState } from 'react'
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../../../firebase"
import useGetUsers from '../../hooks/useGetUsers/useGetUsers'
import TeamList from "../../components/teamList/TeamList"
import Task from "../../components/task/Task";

import style from './ToDoListPage.module.css'
import useCurrentDate from '../../hooks/useToday/useToday';

export function ToDoListPage() {
    
    const { userList } = useGetUsers();
    const taskCollectionRef = collection(db, "tasks");

    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskDate, setNewTaskDate] = useState("");
    
    const [taskList, setTaskList] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    const [taskListFiltered, setTaskListFiltered] = useState([]);
    const [filterDone, setFilterDone] = useState(null)

    const currentDate = useCurrentDate();


    
    useEffect(() => {
        const unsubscribe = onSnapshot(taskCollectionRef, (snapshot) => {
            const snapshotTasks = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            const emOrdem = Object.values(snapshotTasks).sort((a, b) => {
                if (a.done === b.done) {
                  return b.create - a.create;
                }
                return a.done ? 1 : -1;
              });
            setTaskList(emOrdem);
        });
    
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const filteredTasks = taskList.filter((task) => {
          const matchesSearch = !searchTerm || task.title.toLowerCase().includes(searchTerm.toLowerCase());
          const matchesDone = filterDone === null || task.done === filterDone;
          return matchesSearch && matchesDone;
        });
      
        setTaskListFiltered(filteredTasks);
      }, [searchTerm, taskList, filterDone]);
    
    const onSubmitTask = async () => {
        try{
            await addDoc(taskCollectionRef, {
                title: newTaskTitle,
                description: newTaskDescription,
                date: newTaskDate,
                done: false,
                block: false,
                uid: auth.currentUser.uid,
                create: serverTimestamp()
            });
            setNewTaskTitle("")
            setNewTaskDescription("")
            setNewTaskDate("")
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
                <div className={style.teste}></div>     
                <div className={style.newTask}>
                    <input 
                        type="text" 
                        placeholder="Título"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        />

                     <textarea  
                        className={style.textArea}
                        value={newTaskDescription}
                        maxLength="400"
                        type="text" 
                        placeholder="Descrição"
                        onChange={(e) => setNewTaskDescription(e.target.value)}
                        />  

                    <input 
                        type="date" 
                        min={currentDate}
                        value={newTaskDate}
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

                        <div className={style.btnFilter}>
                            <button className={filterDone? style.btnSelected : style.btn} onClick={() => setFilterDone(true)}>Concluídas</button>
                            
                            <button className={filterDone == false? style.btnSelected : style.btn} onClick={() => setFilterDone(false)}>Não Concluídas</button>
                            
                            <button className={filterDone == null? style.btnSelected : style.btn} onClick={() => setFilterDone(null)}>Todas</button>

                        </div>

                        
                </div>

                <Task taskList={taskListFiltered}/>

            </div>
        </div>
    )
}