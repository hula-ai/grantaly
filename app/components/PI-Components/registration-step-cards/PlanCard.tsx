import { Plan, PriceType } from '~/config'
import { Card } from '../multi-step/card/Card'
import { SelectionToggle } from '../SelectionToggle'
import styles from './PlanCard.module.scss'
import { useState } from 'react'
import BookMeetingButton from '@/components/BookMeetingButton/BookMeetingButton'

type Props = {
  plans: Plan[]
  selectedPlan: Plan
  onPlanChange: (planId: Plan) => void
  selectedPriceType: PriceType
  onPriceTypeToggle: () => void
}

export default function PlanCard(
  { plans, selectedPlan, onPlanChange, selectedPriceType, onPriceTypeToggle }:
    Props,
) {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookMeeting = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <Card>
      <Card.Title>Meeting Booking</Card.Title>
      <Card.Description>
        Select date to book a meeting.
      </Card.Description>

      <BookMeetingButton/>


    </Card>
  )
}

function getIconPath(iconName: string) {
  return `assets/images/icon-${iconName}.svg`
}

function getPriceMessage(plan: Plan, type: PriceType) {
  if (type === 'monthly') {
    return `$${plan.monthlyPrice}/mo`
  }

  return `$${plan.yearlyPrice}/yr`
}
