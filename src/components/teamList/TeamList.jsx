import { Monitor } from "phosphor-react";

import style from './teamList.module.css'

const TeamList = ({ users }) => {

    return(
        <ul>
            {users.map((user) => (
                <li className={style.list} key={user.id}>
                    <div className={style.user}>
                        <div className={style.mainInfo}>
                            <img className={style.avatar} src={user.photoURL} alt="" />
                            <h1 className={style.name}>{user.name}</h1>
                        </div>
                        <span 
                            className={user.online? style.online : style.offline}><Monitor/></span>
                    </div>
                </li>))}
        </ul>
    )
}

export default TeamList