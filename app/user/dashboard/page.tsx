import React from 'react'
import ClientDashboard from './pageClient';
import { getUserStats } from '@/actions/getUserStats';
const page = async () => {


  const UserStats = await getUserStats();
  return (
    <ClientDashboard UserStats={UserStats}/>
  )
}

export default page