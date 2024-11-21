'use client'
import { useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";

const Banner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookMeeting = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    fetchEvents();
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/meetings');
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
    } catch (error) {
      console.log(error,'DB not updated')
    } 
  };

  return (
    <main>
      <div className="px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center mx-auto max-w-7xl pt-16 sm:pt-20 pb-20 banner-image">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-navyblue sm:text-5xl lg:text-7xl md:4px lh-96">
              Powering Research, <br /> Igniting Innovation
            </h1>
            <p className="mt-2 text-lg leading-8 text-bluegray">
            At Grantaly, we turn your visionary ideas into compelling, funded realities. Let us provide the first step you
               <br /> need in artificial intelligence and data analytics to secure the support you need.
            </p>
          </div>

          <div className="text-center mt-5">
            <button
              type="button"
              onClick={handleBookMeeting}
              className="text-15px text-white font-medium bg-blue py-5 px-9 mt-2 leafbutton"
            >
              Book a meeting
            </button>
            {/* <button
              type="button"
              className="text-15px ml-4 mt-2 text-blue transition duration-150 ease-in-out hover:text-white hover:bg-blue font-medium py-5 px-16 border border-lightgrey leafbutton"
            >
              More info
            </button> */}
          </div>

          <video
            className="mt-10 flex items-center justify-center"
            title="Video Title"
            height={"600px"}
            width={"800px"}
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/videos/media1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>

      {/* Modal Component */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ZrL5uOoxEoytWxOSE7nIJt1TvEb_Di9nOtxd5ytWM-o0_YboBUGa3xaBJSEC3ubkRePG5udsx?gv=true"
          width="90%"
          height="500px"
          frameBorder="0"
          allowFullScreen
        />
      </Modal>
    </main>
  );
};

export default Banner;
