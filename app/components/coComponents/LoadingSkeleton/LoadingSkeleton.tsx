import { Box, Skeleton } from "@chakra-ui/react";

export const DashboardCardLoading = () => {
  return (
    <Skeleton
      startColor="gray.200"
      endColor="gray.400"
      speed={1.5}
      width={"100%"}
      height="124px"
      borderRadius={"5px"}
    />
  );
};
export const CaseCardLoading = () => {
  return (
    <Box bg={"white"} padding={6} rounded={"lg"} display={"flex"} gap={"10px"}>
      <Skeleton
        startColor="gray.200"
        endColor="gray.400"
        speed={1.5}
        width={"200px"}
        height={"206px"}
        borderRadius={"5px"}
      />
      <Box>
        <Box mt={4}>
          <Skeleton
            startColor="gray.200"
            endColor="gray.400"
            speed={1.5}
            width={"200px"}
            height="14px"
            borderRadius={"5px"}
            mb={"10px"}
          />
          <Skeleton
            startColor="gray.200"
            endColor="gray.400"
            speed={1.5}
            width={"250px"}
            height="20px"
            borderRadius={"5px"}
          />
        </Box>
        <Box mt={10}>
          <Skeleton
            startColor="gray.200"
            endColor="gray.400"
            speed={1.5}
            width={"200px"}
            height="14px"
            borderRadius={"5px"}
            mb={"10px"}
          />
          <Skeleton
            startColor="gray.200"
            endColor="gray.400"
            speed={1.5}
            width={"250px"}
            height="20px"
            borderRadius={"5px"}
          />
        </Box>
        <Box mt={4}>
          <ButtonLoading />
        </Box>
      </Box>
    </Box>
  );
};

export const ButtonLoading = () => {
  return (
    <Skeleton
      startColor="gray.200"
      endColor="gray.400"
      speed={1.5}
      width={"150px"}
      height="40px"
      borderRadius={"10px"}
    />
  );
};
