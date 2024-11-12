'use client'
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
const ServerSideLogin = () => {

    const router = useRouter()
    useEffect(()=>{
        router.push('/login')
    },[router])

    return null;
}

export default ServerSideLogin