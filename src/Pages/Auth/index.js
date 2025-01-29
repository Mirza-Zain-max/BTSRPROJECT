import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Frogot from './Forgot'
import Register from './Register'

const index = () => {
  return (
    <>
      <Routes>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='forgot' element={<Frogot />} />
      </Routes>

    </>
  )
}

export default index