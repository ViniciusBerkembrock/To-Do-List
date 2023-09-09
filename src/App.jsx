import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './assets/hooks/useAuthentication/useAuthentication'

import { Header } from './components/header/Header'
import PrivateRoute from './components/privateRoute/PrivateRoute'
import { LoginPage } from './pages/LoginPage/LoginPage'
import { ToDoListPage } from './pages/ToDoListPage/ToDoListPage'

import './App.css'

function App() {

  return (
    <AuthProvider>
     <BrowserRouter>
      <Header/>
      <Routes>
        <Route  path='/' element={<LoginPage/>} />
        <Route element={<PrivateRoute/>}>
          <Route element={<ToDoListPage/>} path='/toDoList'/>
        </Route>
      </Routes>
     </BrowserRouter>
    </AuthProvider>
  )
}

export default App
