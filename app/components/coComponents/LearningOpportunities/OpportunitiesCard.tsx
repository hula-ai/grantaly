import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import h1 from "@/asset/h1.png";
import { Learning_opportunities } from "@/types/type";
interface Props {
  data: Learning_opportunities;
}

const OpportunitiesCard: React.FC<Props> = ({ data }) => {
  const { isOpen } = useDisclosure();

  return (
    <AccordionItem
      // boxShadow={"md"}
      borderRadius={"10px"}
      border={"1px solid #F3F4F5"}
      // borderColor={"gray.100"}
      // width={ isOpen ? "100%" : "max-content"}
      width={"100%"}
      pb={"13px"}
      height={"max-content"}
      display={'flex'}
      flexDirection={"row"}
      alignItems={'center'}
      fontSize={'13px'}
      color={' white'}
      my={1}
    >
      <AccordionButton maxWidth={'max-content'}>
        <Box textAlign="left">
          <Text my={2} maxWidth={"200px"} isTruncated variant={"p1"} fontWeight={600}>
            { }{data?.abnormality}
          </Text>

          <Image width={"200px"} borderRadius={"4px"} src={data.region_of_interest.heatmap_url + "?v=1"} alt="" />
        </Box>
      </AccordionButton>

      <AccordionPanel pb={4} flex="1">
        <Text variant={"p1"}>
          {/* {data.region_of_interest.heatmap_url} */}
          {data?.explanation_text}
        </Text>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default OpportunitiesCard;
