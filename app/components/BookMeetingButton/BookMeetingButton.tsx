"use client";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";
import Image from "next/image";

const BookMeetingButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data,setData] = useState(null);
  const handleBookMeeting = () => {
    setIsModalOpen(true);
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch('/api/meetings');
      if (!res.ok) {
        throw new Error('Failed to fetch events');
      }
      const data = await res.json();
      setData(data[0])
      console.log(data,'requested data')
    } catch (error) {
    } finally {
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); 
    fetchEvents();
  }; 



  
  return (
    <>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <iframe
          // src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ZrL5uOoxEoytWxOSE7nIJt1TvEb_Di9nOtxd5ytWM-o0_YboBUGa3xaBJSEC3ubkRePG5udsx?gv=true"
          // src="https://calendar.google.com/calendar/embed?src=df83d5b4bfc153a1e5f6082bb4afe8ccae2cd4c0de0ed5fa7e82077477aaf3c9%40group.calendar.google.com&ctz=UTC"
          src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ03WLyelYylFRCIA4VPumbLQYovgLecovo2eJXx9l4CPwuRzrK-cYCUvwloculg4vjAOFq31eOR?gv=true"
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
