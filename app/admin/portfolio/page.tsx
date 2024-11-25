import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser';
import { Role } from '@/types/enum';
import ClientRedirect from '@/components/ClientRedirect/ClientRedirect';
import GuestRedirect from '@/components/GuestRedirect/GuestRedirect';
import AdminPortfolio from './pageClient';
const Page = async () => {

  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return <GuestRedirect/>
  }

  if(!(currentUser?.role === Role.ADMIN)){
      return <ClientRedirect/>
  }

  return (
    // <AdminPortfolio/>
    null
  )
}

export default Page