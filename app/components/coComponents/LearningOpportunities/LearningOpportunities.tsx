import { Accordion, Box } from "@chakra-ui/react";
import React from "react";
import OpportunitiesCard from "./OpportunitiesCard";
import { useSelector } from "@/app/redux/store";
import { Learning_opportunities } from "@/types/type";

const LearningOpportunities = () => {
  const analyticsState = useSelector((state) => state.case.analytics);

  return (
    <Box mb={"2rem "}>
      <Accordion allowMultiple display={"flex"} flexDirection={'column'} gap={"20px"} flexWrap={"wrap"}>
        {analyticsState?.learning_opportunities?.map(
          (item: Learning_opportunities,index:number) => {
            return <OpportunitiesCard data={item} key={index} />;
          }
        )}
      </Accordion>
    </Box>
  );
};

export default LearningOpportunities;
