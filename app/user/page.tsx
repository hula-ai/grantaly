'use client'
import ProjectInitiate from '@/components/Navbar/ProjectInitiate'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const page = () => {

  const router = useRouter();
  useEffect(() => {
    router.push('user/dashboard');
  })

  return (
    // <ProjectInitiate/>
    null
  )
}

export default page