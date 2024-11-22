import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser';
import { Role } from '@/types/enum';
import GuestRedirect from '@/components/GuestRedirect/GuestRedirect';
import ScheduledMeetings from './pageClient';
import AdminRedirect from '@/components/AdminRedirect/AdminRedirect';
const Page = async () => {

  const currentUser = await getCurrentUser();

  if(!currentUser) {
    return <GuestRedirect/>
  }

  if(!(currentUser?.role !== Role.ADMIN)){
      return <AdminRedirect/>
  }

  return (
    <ScheduledMeetings/>
  )
}

export default Page