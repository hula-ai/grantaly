'use client'
import { WhyProps } from "@/interface/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

const Why = ({heading, subHeading, subContent, whyContent} : WhyProps) => {

    const router = useRouter()
    return (
        <div id="about">
            <div className='mx-auto max-w-7xl px-4 my-20 sm:py-20 lg:px-8'>
                <h1 className="text-6xl lg:text-7xl font-semibold text-center my-6">{heading}</h1>
                <div className='grid items-center justify-center grid-cols-1 lg:grid-cols-2 gap-8'>

                    {/* COLUMN-1 */}
                    <div className="relative">
                        <Image 
                            className="p-12 flex items-center justify-center"
                            src="/assets/image.png" 
                            alt="iPad-image" 
                            layout="responsive" 
                            width={4000} 
                            height={900} 
                        />
                    </div>

                    {/* COLUMN-2 */}
                    <div>
                        <div className="mt-0">
                            {whydata.map((items, i) => (
                                <div className="flex gap-6 items-start justify-start mt-4" key={i}>
                                    <div className="rounded-full w-10 h-10 flex items-center justify-center bg-circlebg">
                                        <Image 
                                            src="/assets/why/check.svg" 
                                            alt="check-image" 
                                            width={25} 
                                            height={25} 
                                            className="rounded-full" 
                                        />
                                    </div>
                                    <div className="ml-0">
                                        <h4 className="text-2xl font-semibold">{items.heading}</h4>
                                        <h5 onClick={() => {router.push('/')}} className={`lg:max-w-[400px] md:max-w-[800px] sm:max-w-[600px] max-w-[400px] text-lg text-beach font-normal mt-2`}>{items.subheading}</h5>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Why;
