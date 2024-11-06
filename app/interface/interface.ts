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
}