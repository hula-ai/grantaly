import React from 'react'
import ClientDashboard from './pageClient';
import { getUserStats } from '@/actions/getUserStats';
import getCurrentUser from '@/actions/getCurrentUser';
import { Role } from '@/types/enum';
import AdminRedirect from '@/components/AdminRedirect/AdminRedirect';
import PageClient from '@/project-initialization/pageClient';
import GuestRedirect from '@/components/GuestRedirect/GuestRedirect';
const page = async () => {


  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return <GuestRedirect/>
  }
  
  if(currentUser?.role === Role.ADMIN){
    <AdminRedirect/>
  }

  const UserStats = await getUserStats();
  return (
    <ClientDashboard UserStats={UserStats}/>
  )
}

export default page