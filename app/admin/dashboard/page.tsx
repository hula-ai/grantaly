import React from 'react'
import AdminDashboard from './pageClient'
import { getAdminStats } from '@/actions/getAdminStats';
import getCurrentUser from '@/actions/getCurrentUser';
import { Role } from '@/types/enum';
import ClientRedirect from '@/components/ClientRedirect/ClientRedirect';
import GuestRedirect from '@/components/GuestRedirect/GuestRedirect';
const page = async () => {

  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return <GuestRedirect/>
  }

  if(!(currentUser?.role === Role.ADMIN)){
      return <ClientRedirect/>
  }

  const AdminStats = await getAdminStats();
  return (
    <AdminDashboard AdminStats={AdminStats}/>
  )
}

export default page