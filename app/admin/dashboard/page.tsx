import React from 'react'
import AdminDashboard from './pageClient'
import { getAdminStats } from '@/actions/getAdminStats';
const page = async () => {


  const AdminStats = await getAdminStats();
  return (
    <AdminDashboard AdminStats={AdminStats}/>
  )
}

export default page