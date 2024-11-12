// import { Box, Heading, Text, Icon } from "@chakra-ui/react";
// import React from "react";
// import { UserIcon } from "@chakra-ui/icons";

// interface Props {
//   title: string;
//   count: number;
// }

// const DashboardCard = ({ title, count }: Props) => {
//   return (

//     <Box
//       padding={"25px"}
//       py={6}
//       borderRadius={"10px"}
//       backgroundColor={"white"}
//       style={{
//         boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
//       }}
//     >
//       <Text fontSize={'18px'} fontWeight={'medium'} margin={"0 0 30px 0"} color={"black"}>
//         {title}
//       </Text>
//       <Text variant={"p1"} color={'blue.500'}>{count}</Text>
//     </Box>

//   );
// };

// export default DashboardCard;




import { Box, Text, Icon } from "@chakra-ui/react";
import { MdPerson } from "react-icons/md";

interface Props {
  title: string;
  count: number;
  icons: any
}

const DashboardCard = ({ title, count, icons }: Props) => {
  return (
    <Box
      padding={"25px"}
      py={7}
      borderRadius={"15px"}
      backgroundColor={"white"}
      _hover={{ cursor: 'pointer' }}
      style={{
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        <Text fontSize={'18px'} fontWeight={'medium'} margin={"0 0 10px 0"} color={"black"}>
          {title}
        </Text>
        <Text fontSize={'16px'} mt={6} fontWeight={'bold'} color={'blue.700'}>
          {count}
        </Text>
      </Box>

      {/* Circular User Icon */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="50%"
        width="40px"
        height="40px"
        backgroundColor="purple.100"
        color="purple.100"
        mt={-6}
      >
        <Icon
          as={icons}
          boxSize={25}
          color={'#F3F4F5'}
        />
      </Box>
    </Box>
  );
};

export default DashboardCard;
