

export const dynamic = "force-dynamic"
import React from 'react';
import Banner from './components/Banner/Banner';
import Companies from './components/Companies/Companies';
import Buyers from './components/Buyers/index';
import Provide from './components/Provide/index';
import Why from './components/Why/index';
import Network from './components/Network/index';
import Clientsay from './components/Clientsay/index';
import Newsletter from './components/Newsletter/Newsletter';
import { WHYDATA } from './constants/WhyConstants';
import { whyDataInterface } from './interface/interface';
import getCurrentUser from './actions/getCurrentUser';


export default function Home() {

  // const currentUser = await getCurrentUser();
  // console.log(currentUser);

  const idx = 0; // Set the index you want to use
  

  return (
    <main>
      <Banner />
      {/* <Companies /> */}
      <Buyers />  
      {/* <Provide /> */}
      <Why {...WHYDATA(idx)} />
      <Network />
      {/* <Clientsay /> */}
      <Newsletter />
    </main>
  )
}
