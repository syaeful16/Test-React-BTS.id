import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import { Auth } from '../../Utils/APIFunc'
import { StoreToken } from '../../Utils/TokenHelper'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const [formData, setFormData] = useState({})
    const [errorMsg, setErrorMsg] = useState()
    const [regisMsg, setRegisMsg] = useState('')

    const navigate = useNavigate()


    const handleOnChange = (e) => {
        const {name, value} = e.target

        setFormData({...formData, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        try {
            const response = await fetch('http://94.74.86.174:8080/api/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(formData)
            })
      
            const result = await response.json()
            console.log(result)
            if (!response.ok) {
              setErrorMsg(result.errorMessage)
              return
            }

            console.log()
            setRegisMsg(result.message)
            setTimeout(() => {
                navigate('/')
            }, 1500)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <header>
                <Navbar></Navbar>
            </header>
            <main className='h-[90vh] flex justify-center items-center bg-slate-50'>
            <div className="w-1/4 h-auto p-10 bg-white rounded shadow-xl">
                <h1 className='text-3xl font-bold mb-5'>Register</h1>
                {errorMsg && 
                <div className='w-full border border-red-500 bg-red-100 text-red-500 p-4 rounded-md mb-4'>
                    {errorMsg}
                </div>
                }
                {regisMsg && 
                <div className='w-full border border-green-500 bg-green-100 text-green-500 p-4 rounded-md mb-4'>
                    {regisMsg}
                </div>
                }
                <form onSubmit={handleSubmit}>
                    <label className='flex flex-col gap-1'>
                        <span>Username</span>
                        <input type='text' id='username' name='username' placeholder='Masukkan username Anda' className='w-full py-2 px-3 border border-black outline-none rounded-md' onChange={handleOnChange}></input>
                    </label>
                    <label className='flex flex-col gap-1 mt-5'>
                        <span>Email</span>
                        <input type='email' id='email' name='email' placeholder='Masukkan email Anda' className='w-full py-2 px-3 border border-black outline-none rounded-md' onChange={handleOnChange}></input>
                    </label>
                    <label className='flex flex-col gap-1 mt-5'>
                        <span>Password</span>
                        <input type='password' id='password' name='password' placeholder='Masukkan password Anda' className='w-full py-2 px-3 border border-black outline-none rounded-md' onChange={handleOnChange}></input>
                    </label>
                    <button type="submit" className='w-full py-2 bg-blue-500 text-white rounded text-xl mt-8'>Register</button>
                </form>
            </div>
            </main>
        
        </>
    )
}

export default Register