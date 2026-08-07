import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Login from '../pages/Login'

const Protectedroute = ({children}) => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)

        if(!isAuthenticated){
            return <Navigate to="/login" replace />
        }    
  return children;
}

export default Protectedroute