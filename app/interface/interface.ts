export interface whyDataInterface {
    heading: string;
    subheading: string;
}

interface WhyContentInterface {
    heading: string;
    content: string;
}
export interface WhyProps { 
    heading: string;
    subHeading: string;
    subContent: string;
    WhyContent: WhyContentInterface;
}