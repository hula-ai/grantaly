import { WhyProps } from "@/interface/interface";
import Image from "next/image";



const whydata = [
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

const Why = ({heading,subHeading,subContent,whyContent} :WhyProps) => {
    return (
        <div id="about">
            <div className='mx-auto max-w-7xl px-4 my-20 sm:py-20 lg:px-8'>
                <h1 className="text-6xl lg:text-7xl font-semibold text-center my-6">{heading}</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2'>

                    {/* COLUMN-1 */}
                    <div className="lg:-ml-64">
                        <Image src="/assets/why/ipad.png" alt="iPad-image" width={4000} height={900} />
                    </div>

                    {/* COLUMN-2 */}
                    <div>
                        <h3 className="text-4xl lg:text-5xl pt-4 font-semibold sm:leading-tight mt-5 text-center lg:text-start">Why we best?</h3>
                        <h4 className="text-lg pt-4 font-normal sm:leading-tight text-center text-beach lg:text-start">Dont waste time on search manual tasks. Let Automation do it for you. Simplify workflows, reduce errors, and save time.</h4>

                        <div className="mt-10">
                            {whydata.map((items, i) => (
                                <div className="flex items-start justify-start mt-4" key={i}>
                                    <div className={`rounded-full h-8 ${i==2 ? 'w-8' : i==3 ? 'w-16' : 'w-12'} flex items-center justify-center bg-circlebg`}>
                                        <Image src="/assets/why/check.svg" alt="check-image" width={24} height={24} />
                                    </div>
                                    <div className="ml-5">
                                        <h4 className="text-2xl font-semibold">{items.heading}</h4>
                                        <h5 className="text-lg text-beach font-normal mt-2">{items.subheading}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default Why;
