import { whyDataInterface } from "@/interface/interface"


export const WHYDATA = (idx : number) => {
    return {
        heading: "How It Works​",
        subHeading : "Your Vision, We Help Build AI Models​",
        subContent : "Grantaly specializes in fast, impactful proof-of-concept models tailored to your research goals​",
        whyContent : whydata
    }
}
const whydata: whyDataInterface[] = [
    {
        heading: "Step 1: Book a Meeting​",
        subheading: "Provide us information on your grant proposal and funding agency while booking your meeting​",
    },
    {
        heading: "Step 2: Discuss Requirements​",
        subheading: "We schedule a meeting within 24 hour to discuss your needs and delve into specific AI tasks​",
    },
    {
        heading: "Step 3: Data Upload​",
        subheading: "Describe your dataset and upload it to our server​",
    },
    {
        heading: "Step 4: Results Deliveries​​",
        subheading: "We deliver high-quality preliminary results (graphs, tables, figures) within 2-4 weeks that you can use in your proposals.​",
    }
]
