
import { Card } from '../multi-step/card/Card'
import { SelectionToggle } from '../SelectionToggle'
import styles from './PlanCard.module.scss'
import { useState } from 'react'
import BookMeetingButton from '@/components/BookMeetingButton/BookMeetingButton'


export default function PlanCard( ) {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookMeeting = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    
    <Card >
      <Card.Title>Meeting Booking</Card.Title>
      <Card.Description>
        Select date to book a meeting.
      </Card.Description>

      <BookMeetingButton/>


    </Card>
  )
}

