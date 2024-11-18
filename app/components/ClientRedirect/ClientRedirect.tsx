'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const ClientRedirect = () => {

    const router = useRouter();
    useEffect(()=>{
        router.push('/user/dashboard')
    },[])

    return (
        null
    )
}

export default ClientRedirect