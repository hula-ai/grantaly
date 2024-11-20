import React from 'react'
import EditProject from './pageClient'
import getCurrentUser from '@/actions/getCurrentUser';
import { getProjectById } from '@/actions/getProjectById';
import ProjectInitiate from '@/components/Navbar/ProjectInitiate';
import GuestRedirect from '@/components/GuestRedirect/GuestRedirect';

export const dynamic = "force-dynamic"



interface IParams {
  id: string;
}
const page = async ({ params }: { params: IParams }) => {

  const {id} = params
  const currentUser = await getCurrentUser();
  const Project = await getProjectById({projectId:id});

  if(!Project)
    return <GuestRedirect/>;
  

  return (
    <EditProject currentUser={currentUser} Project={Project}/>
  )
}

  

export default page