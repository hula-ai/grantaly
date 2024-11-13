import { Role } from "@/models/user";

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