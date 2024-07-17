import React from 'react'
import { NavLink } from 'react-router-dom'
import { removeToken, retrieveToken } from '../../Utils/TokenHelper'
import { useNavigate } from 'react-router-dom'

const Navbar = ({  }) => {
    const token = retrieveToken()

    const navigate = useNavigate()

    const handleLogout = () => {
        removeToken()

        navigate('/')
    }

    return (
        <nav className='container flex justify-between items-center py-4'>
            <h1 className='text-2xl'>Project</h1>
            <div className="">
                
                <ul className='flex justify-center items-center gap-5'>
                    { !token ? 
                        <>
                            <li><NavLink to='/' className={({isActive}) => `${isActive ? 'border-black': 'border-gray-400'} border py-2 px-5 rounded`}>Login</NavLink></li>
                            <li><NavLink to='/register' className={({isActive}) => `${isActive ? 'bg-slate-900': 'bg-slate-600'} text-white py-2 px-5 rounded`}>Register</NavLink></li>
                        </>
                    : 
                        <>
                            <li><button className={'bg-slate-900 text-white py-2 px-5 rounded'} onClick={handleLogout}>Logout</button></li>
                        </>}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar