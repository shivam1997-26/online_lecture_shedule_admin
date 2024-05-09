import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './auth/Login'
import Course from './component/course/Course'
import AddInstructor from './component/instructor/AddInstructor'
import Instructor from './component/instructor/Instructor'
import Lecture from './component/lecture/Lecture'
import Navbar from './shared/Navbar'

function App() {

  const [token, setToken] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken(true)
    } else {
      setToken(false)
    }
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        {
          token == false &&
          <Route path='/' element={<Login />} />

        }
        <Route path='/courses' element={<Course />} />
        <Route path='/lecture' element={<Lecture />} />
        <Route path='/instructor' element={<Instructor />} />
        <Route path='/addInstructor' element={<AddInstructor />} />
      </Routes >


      <Toaster />
    </>
  )
}

export default App
