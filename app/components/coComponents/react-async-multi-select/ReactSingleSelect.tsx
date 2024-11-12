import { globalStyles } from "@/app/style/globalStyles";
import { Assignee } from "@/types/type";
import React from "react";
import { ActionMeta } from "react-select";

import AsyncSelect from "react-select/async";
interface CustomAsyncSelectProps {
  placeholder: string;
  optionList: Assignee[];
  value: Assignee | null; // Array of selected UserObject
  selectData: (e: Assignee) => void; // Expecting array of UserObject
  isLoading?: boolean;
}

const ReactSingleSelect: React.FC<CustomAsyncSelectProps> = ({
  placeholder,
  optionList,
  selectData,
  value,
  isLoading,
}) => {
  const filterColors = (inputValue: string) => {
    return optionList.filter((i: Assignee) => {
      if (i.name) {
        return i.name.toLowerCase().includes(inputValue.toLowerCase());
      }
    });
  };
  const onChange = (
    option: Assignee | null,
    actionMeta: ActionMeta<Assignee>
  ) => {
    if (option) {
      selectData(option);
    }
    console.log("option", option);
  };
  const loadOptions = (
    inputValue: string,
    callback: (options: Assignee[]) => void
  ) => {
    callback(filterColors(inputValue));
  };

  return (
    <AsyncSelect
      onChange={onChange}
      getOptionLabel={(opt: Assignee) => (opt.name ? opt.name : "")}
      defaultOptions={optionList}
      value={value}
      loadOptions={loadOptions}
      placeholder={placeholder}
      styles={{
        ...globalStyles.selectStyle,
      }}
    />
  );
};
export default ReactSingleSelect;
