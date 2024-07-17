import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import PrivateRoute from './PrivateRoutes/PrivateRoute'
import Content from './pages/Content'
import MainTodo from './pages/MainTodo'
import DetailTodo from './pages/DetailTodo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/todo' element={<MainTodo/>}/>
          <Route path='/todo/:id' element={<DetailTodo/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
