"use client";
import { useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";

const BookMeetingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookMeeting = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <iframe
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ZrL5uOoxEoytWxOSE7nIJt1TvEb_Di9nOtxd5ytWM-o0_YboBUGa3xaBJSEC3ubkRePG5udsx?gv=true"
          width="90%"
          height="500px"
          frameBorder="0"
          allowFullScreen
        />
      </Modal>

      <div className="text-center mt-5">
        <button
          type="button"
          onClick={handleBookMeeting}
          className="text-15px text-white font-medium bg-blue py-5 px-9 mt-2 leafbutton"
        >
          Book a meeting
        </button>
      </div>
    </>
  );
};

export default BookMeetingButton;
