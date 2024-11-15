import { Privacy, Roles } from "@/types/type";

export const Privacy_Constant: Privacy = {
  private: "private",
  public: "public",
};
export const roles: string[] = [
  "user",
  "admin",
  "superadmin",
  "teacher",
  "student",
];
export const status: string[] = [
  "active",
  "inactive",
];

export const LIMIT_COUNT =5
export const uniqueSuffix = `${Date.now()}`;
