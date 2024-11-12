import React from "react";
import AsyncSelect from "react-select/async";
import { Assignee, UserObject } from "@/types/type";
import { MultiValue, ActionMeta } from "react-select";

interface CustomAsyncSelectProps {
  placeholder: string;
  optionList: UserObject[] ;
  value: UserObject[]; // Array of selected UserObject
  onChange: (value: UserObject[]) => void; // Expecting array of UserObject
  isLoading?: boolean;
  isMulti?: boolean;
}

const filterOptions = (
  inputValue: string,
  optionList: UserObject[],
  selectedOptions: UserObject[]
) => {
  const normalizedInputValue = inputValue.toLowerCase();

  return optionList
    .filter(
      (option) =>
        !selectedOptions.some((selected) => selected._id === option._id) &&
        option.email.toLowerCase().includes(normalizedInputValue)
    )
    .map((option) => ({
      value: option,
      label: option.name,
    }));
};

const promiseOptions = (
  inputValue: string,
  optionList: UserObject[],
  selectedOptions: UserObject[]
) =>
  new Promise<{ value: UserObject; label: string }[]>((resolve) => {
    setTimeout(() => {
      const filteredOptions = filterOptions(
        inputValue,
        optionList,
        selectedOptions
      );
      resolve(filteredOptions);
    }, 1000);
  });

const ReactAsyncMultiSelect: React.FC<CustomAsyncSelectProps> = ({
  placeholder,
  optionList,
  onChange,
  value,
  isMulti,
  isLoading,
}) => {
  const loadOptions = (
    inputValue: string,
    callback: (options: { value: UserObject; label: string }[]) => void
  ) => {
    promiseOptions(inputValue, optionList, value).then((result) =>
      callback(result)
    );
  };

  const handleChange = (
    selectedOptions: MultiValue<{ value: UserObject; label: string }>,
    actionMeta: ActionMeta<{ value: UserObject; label: string }>
  ) => {
    const newValue = selectedOptions.map((option) => option.value);
    onChange(newValue); // Ensure onChange accepts the correct type
  };

  return (
    <AsyncSelect
      isMulti
      isDisabled={isLoading}
      cacheOptions
      defaultOptions={optionList.map((option) => ({
        value: option,
        label: option.name,
      }))}
      placeholder={placeholder}
      loadOptions={loadOptions}
      closeMenuOnSelect={false}
      onChange={handleChange}
      value={value?.map((option) => ({ value: option, label: option.name }))}
      getOptionLabel={(option) => option.label}
      // getOptionValue={(option) => option.value._id} // Ensure this is unique
      styles={{
        container: (provided) => ({
          ...provided,
          width: "100%", // Full width
        }),
        control: (provided) => ({
          ...provided,
          border: "1px solid #000000", // Border color
          boxShadow: "none",
          "&:hover": {
            border: "1px solid #999999", // Border color on hover
          },
          borderRadius: "4px", // Rounded corners
          backgroundColor: "#fff", // Background color
        }),
        menu: (provided) => ({
          ...provided,
          borderRadius: "4px", // Rounded corners
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)", // Shadow
        }),
        menuList: (provided) => ({
          ...provided,
          padding: 0,
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected
            ? "#e6f7ff"
            : state.isFocused
            ? "#f0f4f8"
            : "#fff",
          color: "#333",
          padding: 10,
        }),
        placeholder: (provided) => ({
          ...provided,
          color: "#999",
        }),
        multiValue: (provided) => ({
          ...provided,
          backgroundColor: "#e6f7ff",
          borderRadius: "2px",
        }),
        multiValueLabel: (provided) => ({
          ...provided,
          color: "#333",
        }),
        multiValueRemove: (provided) => ({
          ...provided,
          color: "#999",
          ":hover": {
            color: "#f5222d",
          },
        }),
      }}
    />
  );
};

export default ReactAsyncMultiSelect;
