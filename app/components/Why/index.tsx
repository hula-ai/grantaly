'use client'
import { WhyProps } from "@/interface/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Modal from "../Modal/Modal";

const whydata = [
    {
        heading: "Step 1: Book a Meeting​",
        subheading: "Provide us information on your grant proposal and funding agency while booking your meeting​",
    },
    {
        heading: "Step 2: Discuss Your Vision",
        subheading: "We schedule a meeting within 24 hour to discuss your needs and delve into specific AI tasks​",
    },
    {
        heading: "Step 3: Data Upload​",
        subheading: "Securely upload your data for analysis and model development.​",
    },
    {
        heading: "Step 4: Receive Your Preliminary Results",
        subheading: "We deliver ready-to-use results―graphs, tables, and figures―within 2-4 weeks, empowering your proposal with the evidence it needs.​",
    }
]

const Why = ({heading, subHeading, subContent, whyContent} : WhyProps) => {

    const router = useRouter()

    const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookMeeting = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

    return (
        <div id="about">
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <iframe
                src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ZrL5uOoxEoytWxOSE7nIJt1TvEb_Di9nOtxd5ytWM-o0_YboBUGa3xaBJSEC3ubkRePG5udsx?gv=true"
                width="90%"
                height="500px"
                frameBorder="0"
                allowFullScreen
                />
            </Modal>
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
                                        {i === 0 && <span onClick={handleBookMeeting} className="cursor-pointer text-black hover:text-blue-500 hover:underline">Schedule Now</span>}
                                        <h5 className={`lg:max-w-[400px] md:max-w-[800px] sm:max-w-[600px] max-w-[400px] text-lg text-beach font-normal mt-2`}>{items.subheading}</h5>
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
