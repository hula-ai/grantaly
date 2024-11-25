import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";
export interface SignUpField {
  firstName: string;
  lastName:string;
  contact: string;
  email: string;
  password: string;
  role?: string;
  status?: string;
  image?: File;
}
export interface UserField {
  name: string;
  email: string;
  yoe: string;
  designation: string;
  role?: string;
  status?: string;
  profilePic?: File;
  _id?: string;
  receiveNotifications?: boolean;
}

export interface PasswordField {
  OldPassword: string;
  NewPassword: string;
  ConfirmPassword: string;
  // _id?: string;
}

export interface TeachingForm {
  profession: string;
  description: string;
  teachingExperience: string;
}
export interface UserEditFormFields {
  id: string;
  name: string;
  email: string;
  password: string;
  yoe: string;
  designation: string;
}

export interface SignInField {
  email: string;
  password: string;
}
export interface OptionsType {
  name: string;
  value: string;
}

export interface MainDicomTags {
  AccessionNumber: string;
  InstitutionName: string;
  ReferringPhysicianName: string;
  StudyDate: string;
  StudyID: string;
  StudyInstanceUID: string;
  StudyTime: string;
}

export interface PatientMainDicomTags {
  PatientBirthDate: string;
  PatientID: string;
  PatientName: string;
  PatientSex: string;
}

export interface Description {
  ID: string;
  IsStable: boolean;
  Labels: string[];
  LastUpdate: string; // Assuming format is a string, adjust if needed
  imageUrl: string; // Assuming format is a string, adjust if needed
  MainDicomTags: MainDicomTags;
  ParentPatient: string;
  PatientMainDicomTags: PatientMainDicomTags;
  Series: string[];
  Type: string;
  description: string;
}

export interface CaseObject {
  _id: ObjectId; // ObjectId as string
  userId: UserObject | string | Assignee; // ObjectId as string
  studyId: string;
  description: Description;
  createdAt: string; // ISO 8601 format
  updatedAt: string; // ISO 8601 format
  __v: number;
  privacy: string;
  assigne: Assignee[];
}

export interface FileUrl {
  path: string;
  caseId?: string; // caseId might be undefined in some cases// Only present in some csvUrls
  url: string;
  _id: string;
  isConverted?: boolean;
  isApproved?: boolean;
}

// export interface UserObject {
//   _id: ObjectId;
//   name: string;
//   email: string;
//   password: string;
//   yoe: string; // years of experience
//   designation: string;
//   isRequested: boolean;
//   cases?: CaseObject[] | ObjectId[]; // Array of case IDs
//   role: string;
//   status: string;
//   csvs: any[]; // Assuming the structure of CSVs is not provided
//   videos: UrlType[];
//   createdAt: Date;
//   updatedAt: Date;
//   __v?: number;
// }

export interface UserObject {
  _id: ObjectId;
  fristName: string;
  lastName: string;
  contact: string;
  email: string;
  password: string;
  googleId:string;
  role:string;
  image:string;
  resetToken:string;
  resetTokenExpiration:string;
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
}

export interface Roles {
  admin: string;
  superAdmin: string;
  user: string;
  teacher: string;
  student: string;
}
export interface MouseEvent {
  x?: number;
  y?: number;
  slide?: number;
  scrollTop?: number;
  timeStamp?: Date;
}

export interface ZoomEvent {
  scale?: string;
  slide?: string;
  timeStamp?: Date;
}
export interface GazeData {
  frame: Date;
  x: number;
  y: number;
  state: number;
}
export interface UrlType {
  path?: string;
  url?: string;
  caseId: string;
  mode?: string;
  isConverted?: boolean;
  isApproved?: boolean;
}
export interface Privacy {
  private?: string;
  public?: string;
}
export interface Assignee {
  _id: string;
  name?: string;
  email?: string;
  videos: FileUrl[];
}

export interface Case {
  _id: string;
  userId: UserObject;
  studyId: string;
  description: Description;
  privacy: string;
  assigne: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface CaseDetails {
  orthancId: string | null;
  case: CaseObject | null;
}
export interface VideoState {
  teacher: [Assignee];
  student: [Assignee];
  currentUserVideo: Assignee | null;
}
export interface BarChartTypes {
  title: string;
  series: number[];
  xKey: string[];
}
export interface PieChartTypes {
  series: number[];
  label: string[];
}

export interface Learning_opportunities {
  abnormality: string;
  region_of_interest: RegionOfInterest;
  explanation_text: string;
}

export interface RegionOfInterest {
  heatmap_url: string;
  coordinates: Coordinates;
}

export interface Coordinates {
  x: number;
  y: number;
  width: number;
  height: number;
}
export interface DashboardCount {
  cases: number;
  user: number;
}

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

// enums/Status.ts
export enum Status {
  ACTIVE = "active",
  INACTIVE = "inactive",
}
