import React, { useState } from "react";
import { Select, Box, Text } from "@chakra-ui/react";
// import WarningModal from "@/component/WarningModal/WarningModal";
import axios from "axios";
import { useToastFunction } from "@/utils/ToastFunction";
import { OptionsType } from "@/types/type";
interface DropdownProps {
  userId: string;
  alreadySelectedRole: string;
  roles: OptionsType[]; // Array of role names
}

const Dropdown: React.FC<DropdownProps> = ({
  userId,
  alreadySelectedRole,
  roles,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string>(alreadySelectedRole);
  const [tempRole, setTempRole] = useState<string>(alreadySelectedRole); // Temporary role for confirmation
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const showToast = useToastFunction();

  const handleRoleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newRole = event.target.value;
    setTempRole(newRole); // Store the role to be confirmed
    setIsModalOpen(true); // Open the modal for confirmation
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      const response = await axios.put(
        "/api/user/role",
        {
          userId: userId,
          role: tempRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      showToast(
        "User Role Changed.",
        "User Role has been successfully updated",
        "success",
        2000
      );
      setLoading(false);

      setSelectedRole(tempRole); // Update the selected role
    } catch (error) {
      setLoading(false);

      showToast(
        "User Role Change Error.",
        "Error in updating user role",
        "error",
        2000
      );
    } finally {
      setIsModalOpen(false); // Close the modal
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <Select
        value={selectedRole}
        placeholder="Select role"
        onChange={handleRoleSelect}
      >
        {roles.map((role, ind: number) => (
          <option key={ind} value={role.value}>
            {role?.name}
          </option>
        ))}
      </Select>
      {/* <WarningModal
        loading={loading}
        isOpen={isModalOpen}
        onClose={handleCancel}
        onConfirm={handleConfirm}
      /> */}
    </>
  );
};

export default Dropdown;
