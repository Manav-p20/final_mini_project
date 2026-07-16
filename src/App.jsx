import { useState } from 'react'
import './App.css'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Orders from './pages/Orders'
import Products from './pages/Products'
import Users from './pages/Users'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Protectedroute from './components/Protectedroute'

function App() {


  return (
    <BrowserRouter>
     <Routes>
  <Route path="/" element={<Login />} />

  <Route path='/dashboard' element={<Dashboard />} />
<Route path='/products' element={<Products />} />
<Route path='/orders' element={<Orders />} />
<Route path='/users' element={<Users />} />
</Routes>
    </BrowserRouter>
  )
}

export default App
