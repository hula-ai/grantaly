import { Schema } from "joi";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { handleOpenToast } from "./toast";
import { useToastFunction } from "@/utils/ToastFunction";

export const validate = async (schema: Schema, data: any) => {
  try {
    const { error, value } = schema.validate(data);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message, success: false },
        { status: 400 }
      );
    }
    return value;
  } catch (error) {
    console.log("validation", error);
    return NextResponse.json(
      { message: "Something went wrong.", success: false },
      { status: 500 }
    );
  }
};

export const handleClientValidate = (
  schema: Schema,
  data: any,
  toast: any
) => {
  
  try {
    const { error, value } = schema.validate(data);
    if (error) {
      
      handleOpenToast(error.details[0].message, "error", toast);
      return false;
    }
    return value;
  } catch (error) {
    console.log("validation");
    console.log(error);
    handleOpenToast("Something went wrong.", "error", toast);
    

    return false;
  }
};
