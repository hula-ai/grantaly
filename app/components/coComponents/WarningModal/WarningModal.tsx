import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Text,
  Input,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import Loader from "../Loader/Loader";

interface WarningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (reason?: string) => void;
  isDisabled?: boolean;
  loading?: boolean;
  reason?: string;
  setReason?: (value: string) => void;
  showReasonInput?: boolean;
  description?: string;
  title?: string;
}

const WarningModal: React.FC<WarningModalProps> = ({
  loading,
  isOpen,
  onClose,
  reason,
  setReason,
  showReasonInput,
  onConfirm,
  description,
  title,
  isDisabled = false,
}) => {
  const [isReasonEmpty, setIsReasonEmpty] = useState(false);

  const handleConfirm = () => {
    if (showReasonInput) {
      onConfirm(reason);
    } else {
      onConfirm();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent
        backgroundColor={"white"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <ModalHeader>{title ? title : "WARNING!"}</ModalHeader>
        <ModalBody>
          <Text fontWeight="bold">
            {description ? description : "Are you sure you want to do this?"}
          </Text>
          {showReasonInput && (
            <FormControl isInvalid={isReasonEmpty} mt={4}>
              <Input
                placeholder="Enter reason"
                value={reason}
                onChange={(e) => {
                  if (setReason) {
                    setReason(e.target.value);
                  }
                  setIsReasonEmpty(false); // Reset error when user types
                }}
              />
              <FormErrorMessage>Reason cannot be empty.</FormErrorMessage>
            </FormControl>
          )}
        </ModalBody>
        <ModalFooter
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={4}
          padding={4}
        >
          <Button
            colorScheme="red"
            isDisabled={isDisabled}
            onClick={onClose}
            width="120px"
            border={'1px solid gray'}
            bg={'white'}
            color={'black'}
          >
            No
          </Button>
          <Button
            colorScheme="blue"
            isLoading={loading}
            onClick={handleConfirm}
            width="120px"
            bg={'purple.100'}
            color={'white'}
          >
            {"Yes"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningModal;
