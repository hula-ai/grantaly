'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AdminRedirect = () => {

    const router = useRouter();
    useEffect(()=>{
        router.push('/admin/dashboard')
    },[])

    return (
        null
    )
}

export default AdminRedirect