import React from 'react'
import EditProject from './pageClient'
import getCurrentUser from '@/actions/getCurrentUser';
import { getProjectById } from '@/actions/getProjectById';

interface Props {
    id: string
}
const page = async ({ id }: Props) => {

  console.log('awdmdk')

  return null;
  const currentUser = await getCurrentUser();

  const Project = await getProjectById({projectId:id});
  console.log(Project,'awdmdk')
  

  return (
    <EditProject/>
  )
}

  

export default page