import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { useState } from 'react'
import { CreateData, DeleteData, FetchData } from '../Utils/APIFunc'
import { useEffect } from 'react'
import { retrieveToken } from '../Utils/TokenHelper'
import { Link } from 'react-router-dom'

const MainTodo = () => {
    const [formChecklis, setFormChecklist] = useState({})
    const [dataTodo, setDataTodo] = useState([])
    
    const token = retrieveToken()
    
    const fetchData = async () => {
        const response = await FetchData('http://94.74.86.174:8080/api/checklist', token);
        console.log(response.data)
        setDataTodo(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        console.log(dataTodo)
    }, [dataTodo])

    const handleOnChange = async(e) => {
        const {name, value} = e.target
    
        setFormChecklist({...formChecklis, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await CreateData('http://94.74.86.174:8080/api/checklist', token, formChecklis)
        console.log(response)
        fetchData()
    }

    const handleDelete = async(id) => {
        try {
            await DeleteData('http://94.74.86.174:8080/api/checklist', id, token);
            fetchData()
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    }

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main className='container w-full py-10'>
                <section>
                    <form className='w-full mx-auto flex justify-center items-center gap-4' onSubmit={handleSubmit}>
                        <input type="text" id='name' name='name' placeholder='Take Note!' className='w-1/3 py-2 px-3 border border-black outline-none rounded-md' onChange={handleOnChange}/>
                        <button type="submit" className='py-2 px-3 rounded bg-black text-white'>Save</button>
                    </form>
                    <div className="grid grid-cols-4 gap-5 mt-10">
                        {dataTodo.map((todo, i) => (
                            <div key={i} className="bg-slate-100 p-4">
                                <Link to={`/todo/${todo.id}`}>
                                    <h1 className='text-2xl'>{todo.name}</h1>
                                </Link>
                                <button type='button' onClick={() => handleDelete(todo.id)} className='text-red-500'>Delete</button>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </>
    )
}

export default MainTodo