import styles from './Header.module.css'

export function Header() {
    return(
        <header className={styles.header}>
            <h1>To Do List</h1>

            <div>
                <img src="" alt="" />
                <span>Vinicius Berkembrock</span>
            </div>

            <button>LogOut</button>
        </header>
    )
}   