import React from 'react'
import getCurrentUser from '@/actions/getCurrentUser';
import { getProjectById } from '@/actions/getProjectById';
import GuestRedirect from '@/components/GuestRedirect/GuestRedirect';
import EditPortfolioPage from './pageClient';
import { getPortfolioById } from '@/actions/getPortfolioById';

export const dynamic = "force-dynamic"

interface IParams {
  id: string;
}
const page = async ({ params }: { params: IParams }) => {

  const {id} = params
  const currentUser = await getCurrentUser();
  const Portfolio = await getPortfolioById({portfolioId:id});

  if(!Portfolio)
    return <GuestRedirect/>;
  

  return (
    <EditPortfolioPage Portfolio={Portfolio}/>
  )
}

  

export default page