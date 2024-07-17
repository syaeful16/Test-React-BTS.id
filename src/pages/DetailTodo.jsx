import React from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { useState } from 'react'
import { useEffect } from 'react'
import { CreateData, DeleteData, FetchData } from '../Utils/APIFunc'
import { retrieveToken } from '../Utils/TokenHelper'
import { useRef } from 'react'

const DetailTodo = () => {
    const { id } = useParams()

    const token = retrieveToken()

    const itemRef = useRef(null)

    const [onEdit, setOnEdit] = useState(false)
    const [itemEdit, setItemEdit] = useState({})
    
    const [itemTodo, setItemTodo] = useState([])
    const [formItem, setFormItem] = useState({})

    const fetchData = async () => {
        const response = await FetchData(`http://94.74.86.174:8080/api/checklist/${id}/item`, token);
        console.log(response.data)
        setItemTodo(response.data);
    };

    useEffect(() => {
        fetchData();
    }, [])

    const handleOnChange = async(e) => {
        const {name, value} = e.target
    
        setFormItem({...formItem, [name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        const response = await CreateData(`http://94.74.86.174:8080/api/checklist/${id}/item`, token, formItem)
        console.log(response)
        fetchData()
    }

    const toggleTodo = (id) => {
        setItemTodo(
            itemTodo.map(todo =>
            todo.id === id ? { ...todo, itemCompletionStatus: !todo.itemCompletionStatus } : todo
          )
        );
    };

    const handleDeleteItem = async(idItem) => {
        try {
            await DeleteData(`http://94.74.86.174:8080/api/checklist/${id}/item`, idItem, token);
            fetchData()
        } catch (error) {
            console.error('Failed to delete todo:', error);
        }
    }

    const handleOnChangeItem = (e) => {
        const {name, value} = e.target
        
        setFormItem({...formItem, [name] : value})
    }

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main className='container w-full py-10'>
                <section>
                    <form className='w-full mx-auto flex justify-center items-center gap-4' onSubmit={handleSubmit}>
                        <input type="text" id='itemName' name='itemName' placeholder='Add Item' className='w-1/3 py-2 px-3 border border-black outline-none rounded-md' onChange={handleOnChange}/>
                        <button type="submit" className='py-2 px-3 rounded bg-black text-white'>Save</button>
                    </form>
                    <div className="grid grid-cols-2">
                        <ul className="mt-4">
                            {itemTodo.map(todo => (
                                <li key={todo.id} className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            checked={todo.itemCompletionStatus}
                                            onChange={() => toggleTodo(todo.id)}
                                            className="mr-2"
                                        />
                                        {!onEdit ? <p>{todo.name}</p> : <input type='text' name='itemName' value={todo.name} onChange={handleOnChangeItem}/>}
                                        <div className="flex gap-4 ms-10">
                                            {onEdit && 
                                                <div className='flex gap-4'>
                                                    <button type='button' className='text-gray-500' onClick={() => setOnEdit(false)}>cancel</button>
                                                    <button type='button' className='text-blue-500'>Save</button>
                                                </div>
                                            }
                                            <button type='button' className={`${onEdit ? 'hidden' : 'block text-blue-500'}`} onClick={() => setOnEdit(todo.id)}>edit</button>
                                            <button type='button' className='text-red-500' onClick={() => handleDeleteItem(todo.id)}>Delete</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </main>
        </>
    )
}

export default DetailTodo