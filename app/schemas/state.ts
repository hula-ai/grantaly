import { Role } from "@/types/enum";
import { OptionsType, PasswordField, SignInField, SignUpField, UserField } from "@/types/type";

export const SignUpForm: SignUpField = {
  name: "",
  email: "",
  password: "",
  yoe: "",
  role: Role.STUDENT,
  designation: "",
};
export const userForm: UserField = {
  name: "",
  email: "",
  yoe: "",
  role: "",
  status: "",
  designation: "",
  profilePic: undefined,
  receiveNotifications: false,
};

export const passwordForm: PasswordField = {
  OldPassword: "",
  NewPassword: "",
  ConfirmPassword: "",
};

export const SignInForm: SignInField = {
  email: "",
  password: "",
};
export const roles: OptionsType[] = [
  { name: "Admin", value: Role.ADMIN },
  { name: "Teacher", value: Role.TEACHER },
  { name: "Student", value: Role.STUDENT },
];

export const status: string[] = ["active", "inactive"];
export const countState = {
  cases: 0,
  user: 0,
};
