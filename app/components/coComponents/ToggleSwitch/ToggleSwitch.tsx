// components/ToggleSwitch.js
import { useState } from "react";
import { Box, Text, Flex, useToast } from "@chakra-ui/react";
// import WarningModal from "@/component/WarningModal/WarningModal";
import axios from "axios";
import { useToastFunction } from "@/utils/ToastFunction";

interface Props {
    userId: string;
    status: string;
}
const ToggleSwitch = ({userId,status} : Props) => {
  const [isActive, setIsActive] = useState(status === 'active' ? true : false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toast = useToast();
  const showToast = useToastFunction();
  const [isDisabled,setIsDisabled] = useState(false);

  const toggleWarningModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateUserStatus = async () => {
    try {
      setIsDisabled(true)
      const response = await axios.post(`/api/user/status`, {
        status: !isActive ? 'active' : "inactive",
        userId: userId,
      });
      setIsActive(!isActive);
      showToast(
        "User Status Changed.",
        "User status has been successfully updated",
        "success",
        2000
      );
    } catch (error) {
      setIsDisabled(false)

      showToast(
        "User Status Change Error.",
        "Error in updating user status",
        "error",
        2000
      );
    } finally {
      toggleWarningModal();
      setIsDisabled(false)
    }
  };

  const toggleSwitch = () => {
    toggleWarningModal();
  };

  return (
    <Flex alignItems="center">
      {isModalOpen && (
        // <WarningModal
        //   isOpen={isModalOpen}
        //   onClose={toggleWarningModal}
        //   onConfirm={updateUserStatus}
        //   loading={isDisabled}
        // />
        null
      )}
      <Box
        width="80px"
        height="30px"
        borderRadius="20px"
        bg={isActive ? "green.400" : "red.600"}
        display="flex"
        alignItems="center"
        justifyContent={isActive ? "flex-end" : "flex-start"}
        padding="1px"
        cursor="pointer"
        onClick={toggleSwitch}
        position="relative"
      >
        <Box
          width="30px"
          height="30px"
          borderRadius="50%"
          bg="white"
          boxShadow="0 0 2px rgba(0,0,0,0.2)"
          transition="all 0.3s ease"
        />
        <Text
          position="absolute"
          left={isActive ? "10px" : "calc(100% - 45px)"}
          color="white"
          fontWeight="bold"
          transition="all 0.3s ease"
          fontSize="10px"
        >
          {isActive ? "Active" : "Inactive"}
        </Text>
      </Box>
    </Flex>
  );
};

export default ToggleSwitch;
