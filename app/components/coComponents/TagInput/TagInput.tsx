"use client";
import { useSelector } from "@/app/redux/store";
import { get } from "@/fetch/fetch";
import { handleOpenToast } from "@/helper/toast";
import { handleClientValidate } from "@/helper/validation";
import { email } from "@/schemas/validator";
import { Assignee, UserObject } from "@/types/type";
import { endPoints } from "@/utils/endpoint";
import { Box, Progress, useToast } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import TagsInput, { RenderTagProps } from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
interface Props {
  placeholder?: string;
  ownerSelection?: boolean;
  setUsers?: Dispatch<SetStateAction<any>>;
  selectedValue?: Assignee[] | null;
  handleTagStateValidation?: (tagVal: string, type?: string) => boolean;
}
const TagInput: React.FC<Props> = ({
  placeholder,
  setUsers,
  handleTagStateValidation,
  ownerSelection,
  selectedValue,
}) => {
  const Case = useSelector((state) => state.case.caseById);
  console.log("Case", Case);

  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<string[]>([]);

  console.log("data", data);

  const defaultRenderTag = (props: RenderTagProps) => {
    let {
      tag,
      key,
      disabled,
      onRemove,
      classNameRemove,
      getTagDisplayValue,
      ...other
    } = props;
    const handleRemove = () => {
      setData((prev: string[]) => prev.filter((item: string) => item != tag));
      if (setUsers) {
        setUsers((prev: any) =>
          ownerSelection ? null : prev.filter((item: any) => item.email != tag)
        );
      }
    };
    return (
      <span key={key} {...other}>
        {getTagDisplayValue(tag)}
        {!disabled && <a className={classNameRemove} onClick={handleRemove} />}
      </span>
    );
  };
  const toast = useToast();
  const handleChange = async (tags: any) => {
    const lastIndex = tags.length - 1;
    const lastTag = tags[lastIndex];
    const isEmailValid = tags.every((item: string) =>
      handleClientValidate(email, { email: item }, toast)
    );
    if (!isEmailValid) return;

    const isDuplicateEmail = data.every((item: string) => {
      return item !== tags[lastIndex];
    });

    if (!isDuplicateEmail) {
      handleOpenToast("Email already selected", "error", toast);
      return;
    }
    if (Case && handleTagStateValidation) {
      const ownerValidate = handleTagStateValidation(
        lastTag,
        ownerSelection ? "owner" : ""
      );
      if (ownerValidate) return;
    }

    setLoading(true);
    try {
      const findUser = await get(`${endPoints.search_user}?q=${lastTag}`);
      setLoading(false);

      console.log("findUser", findUser);
      if (!findUser.success) {
        handleOpenToast(findUser.message, "error", toast);
        return;
      }
      if (findUser.data) {
        if (ownerSelection) {
          setData([lastTag]);
          if (setUsers) {
            setUsers(() => findUser?.data);
          }
        } else {
          if (setUsers) {
            setUsers((prev: any) => [...prev, findUser?.data]);
          }
          setData(tags);
        }
      }
    } catch (error) {
      setLoading(false);

      handleOpenToast("Something went wrong", "error", toast);
    }
  };
  useEffect(() => {
    if (selectedValue && selectedValue?.length > 0) {
      const selectedEmail = selectedValue?.map((item) =>
        item.email ? item.email : ""
      );


      setData(selectedEmail);
    }
  }, [selectedValue]);

  return (
    <Box >
      <TagsInput
        value={data}
        onChange={handleChange}
        renderTag={defaultRenderTag}
        inputProps={{ placeholder: placeholder }}
        disabled={loading}
      />
      {loading && (
        <Progress size="xs" colorScheme={"gray"} mt={"10px"} isIndeterminate />
      )}
    </Box>
  );
};

export default TagInput;
