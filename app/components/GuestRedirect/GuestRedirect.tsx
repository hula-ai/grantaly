'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const GuestRedirect = () => {

    const router = useRouter();
    useEffect(()=>{
        router.push('/')
    },[])

    return (
        null
    )
}

export default GuestRedirect