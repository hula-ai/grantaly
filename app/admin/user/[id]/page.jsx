// 'use client'
// import CaseInfo from '@/component/CaseInfo/CaseInfo';
// import Header from '@/component/Header/Header';
// import TableComponent from '@/component/Table/Table';
// import { Box, Button, Card, CardBody, CardHeader, Container, Heading } from '@chakra-ui/react';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const User = ({ params }) => {
//   const router = useRouter();
//   const { id } = params;
//   const APIEndPoint = `/api/user/${id}/cases`;
//   const [caseData, setCaseData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [refresh, setRefresh] = useState(false);

//   useEffect(() => {
//     const fetchCaseData = async () => {
//       try {
//         const response = await fetch(`/api/user/${id}/cases`);
//         if (!response.ok) throw new Error('Network response was not ok');
//         const data = await response.json();
//         setCaseData(data);
//       } catch (error) {
//         console.error('Fetch error:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCaseData();
//   }, [id]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   const handleDelete = async (id) => {
//     try {
//       console.log(`Deleteing ${id}.....`)
//       setRefresh(prev => !prev);
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };

//   return (
//     <>
//       <Box bg={"black"} height={"calc(100vh - 15px)"}>
//         <Container maxW={"7xl"}>
//           <Box
//             display={"flex"}
//             p={0}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <Heading size="lg" pt={"0"} color={"white"}>
//               Case Studies
//             </Heading>
//           </Box>
//           <Card
//             bg={"white.100"}
//             border={"1px sold"}
//             borderColor={"red !important"}
//             my={"20px"}
//           >
//             <CardBody pt={"0px"}>
//               {
//                 <TableComponent admin={true} onDelete={handleDelete} APIEndPoint={APIEndPoint} refresh={refresh} />
//               }
//             </CardBody>
//           </Card>
//         </Container>
//       </Box>
//     </>
//   );
// };

// // Fetch data based on the ID from the URL
// User.getInitialProps = async ({ query }) => {
//   return { params: query };
// };

// export default User;
import UsersCaseTable from "@/component/UsersCaseTable/UsersCaseTable";
import React from "react";

const page = () => {
  return (
    <>
      <UsersCaseTable />
    </>
  );
};

export default page;
