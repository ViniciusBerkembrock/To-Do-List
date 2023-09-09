import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { AuthProvider } from './assets/hooks/AuthProvider/AuthProvider'
import  PrivateRoute  from './components/privateRoute/PrivateRoute'
import { Header } from './components/header/Header'
import { AuthProvider } from './assets/hooks/AuthProvider/AuthProvider'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ToDoListPage } from './pages/ToDoListPage/ToDoListPage'

import styles from './App.module.css'

function App() {

  return (
    <AuthProvider>
     <BrowserRouter>
      <Header/>
      <div className={styles.wrapper}>
        <Routes>
          <Route  path='/' element={<LoginPage/>} />
          <Route element={<PrivateRoute/>}>
            <Route element={<ToDoListPage/>} path='/toDoList'/>
          </Route>
        </Routes>
      </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
