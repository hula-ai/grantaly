import { Box, Button, Heading } from "@chakra-ui/react";
import React from "react";
interface Props {
  title: string;
  btnLabel?: string;
  btnEvent?: () => void;
  showButton?: boolean;
}
const NotFound: React.FC<Props> = ({
  showButton,
  title,
  btnEvent,
  btnLabel,
}) => {
  return (
    <Box
      backgroundColor={"white.100"}
      height={"100vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box textAlign={"center"}>
        <Heading textTransform={"capitalize"} size={"xl"} color={"purple.100"}>
          {" "}
          {title}
        </Heading>
        {showButton ? (
          <Button variant={"simple"} bg={"purple.100"} sx={{color:"#fff"}} onClick={btnEvent} my={"20px"}>
            {btnLabel}
          </Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default NotFound;
