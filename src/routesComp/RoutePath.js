import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../component/Dashboard'

const routePath = () => {
  return (
    <>
    <Routes>
    <Route path="/" exact element={<Dashboard/>} />
</Routes>
    </>
  )
}

export default routePath