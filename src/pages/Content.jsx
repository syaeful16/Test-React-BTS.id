import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import { retrieveToken } from '../Utils/TokenHelper'
import { useEffect } from 'react'
import { useState } from 'react'

const Content = () => {
    const [dataContent, setDataContent] = useState([])
    const [errorMsg, setErrorMsg] = useState('')

    const token = retrieveToken()

    const getDataContent = async() => {
        const response = await fetch('http://127.0.0.1:8000/api/posts', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const result = await response.json()
        if (!response.ok) {
            setErrorMsg('Gagal fetching data')
            return
        }

        setDataContent(result)
    }

    useEffect(() => {
        getDataContent()
    }, [])

    return (
        <>
            <header>
                <Navbar/>
            </header>
            <main>
                {dataContent.map((content, i) => (
                    <article key={content.title}>
                        <h1 className='text-3xl'>{content.title}</h1>
                        <p>{content.content}</p>
                    </article>

                ))}
            </main>
        </>
    )
}

export default Content