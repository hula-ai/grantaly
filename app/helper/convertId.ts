import mongoose from "mongoose";

export const handleConversionId = (id: string) => {
    console.log("objId",id);
  const objId = new  mongoose.Types.ObjectId(id);
  
  return objId;
};
