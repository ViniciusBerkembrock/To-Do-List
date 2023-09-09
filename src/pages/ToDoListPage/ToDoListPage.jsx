import { useEffect } from 'react'
import style from './ToDoListPage.module.css'
import { auth } from '../../../firebase'

export function ToDoListPage() {

    useEffect(()=>{
        console.log(auth.currentUser)
}
    )

    return(
        <div className={style.display}>
             ssssssssss   
        </div>
    )
}