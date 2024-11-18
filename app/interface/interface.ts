

export interface whyDataInterface {
    heading: string;
    subheading: string;
}

interface WhyContentInterface {
    heading: string;
    subheading: string;
}
export interface WhyProps { 
    heading: string;
    subHeading: string;
    subContent: string;
    whyContent: WhyContentInterface[];
}

export interface user {
    firstName : string;
    lastName : string;
    contact : string;
    password : string;
    email : string;
    role : Role,
    id: String,
    _id?: String,
}

import { FormStep, Role } from '@/types/enum';
import { ObjectId } from 'mongoose';

interface Document {
  name?: string;
  key?: string;
  url?: string;
}

interface Content {
  url?: string;
  description?: string;
}

export interface Project {
  projectTitle: string;
  abstract: string;
  fundingAgency: string;
  startDate?: Date;
  endDate?: Date;
  expectedTimeline: string;
  isCompeleted: boolean;
  formStep: FormStep;
  isBooked: boolean;
  userId: ObjectId; // Reference to the User model
  clientDocs?: Document[];
  adminDocs?: Document[];
  dataUploadContent?: Content[];
  resultContent?: Content[];
}

export interface File {
  name: string;
  key: string;
  url: string; // URL to the file (e.g., https://example.com/document.pdf)
}

export interface datatype {
    imgSrc: string;
    country: string;
    paragraph: string;
    Project: string[];
}

export interface File {
    name: string;
    key: string;
    url: string; // URL to the file (e.g., https://example.com/document.pdf)
  }

export interface DataUploadLink {
    url: string;
    description: string;
}