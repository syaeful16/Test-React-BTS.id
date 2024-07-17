import React from 'react'
import { retrieveToken } from '../Utils/TokenHelper'
import { Outlet } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const PrivateRoute = () => {
    const token = retrieveToken()

    console.log(token)

    return (
        token ? <Outlet/> : <Navigate to={'/'}/>
    )
}

export default PrivateRoute