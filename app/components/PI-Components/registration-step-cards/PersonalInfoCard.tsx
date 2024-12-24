import { useRef, useState, useEffect } from 'react'
import { FormInput } from '../form/FormInput'
import { Card } from '../multi-step/card/Card'
import styles from './PersonalInfoCard.module.scss'
import React from 'react'
import { FormTextArea } from '../textarea/textarea'


interface Props {
    projectTitle: string;
    abstract: string;
    fundingAgency: string;
    startDate: string;
    endDate: string;
    expectedTimeline: string;
    
    setProjectTitle: (value: string) => void;
    setAbstract: (value: string) => void;
    setFundingAgency: (value: string) => void;
    setStartDate: (value: string) => void;
    setEndDate: (value: string) => void;
    setExpectedTimeline: (value: string) => void;
  }

export default function PersonalInfoCard(
  { projectTitle,
    abstract,
    fundingAgency,
    startDate,
    endDate,
    expectedTimeline,
    setProjectTitle,
    setAbstract,
    setFundingAgency,
    setStartDate,
    setEndDate,
    setExpectedTimeline,
  }: Props,
) {

  const projectTitleInputRef = useRef<HTMLInputElement>(null)
  const abstractInputRef = useRef<HTMLInputElement>(null)
  const fundingAgencyInputRef = useRef<HTMLInputElement>(null)
  const startDateInputRef = useRef<HTMLInputElement>(null)
  const endDateInputRef = useRef<HTMLInputElement>(null)
  const expectedTimelineInputRef = useRef<HTMLInputElement>(null)


  const [hasSubmitted, setHasSubmitted] = useState(false)

  // Calculate the expected timeline based on start and end dates
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)

      // Calculate the difference in days
      const timeDiff = end.getTime() - start.getTime()
      const diffDays = timeDiff / (1000 * 3600 * 24)

      if (diffDays >= 0) {
        setExpectedTimeline(`${diffDays} days`)
      } else {
        setExpectedTimeline('Invalid date range')
      }
    }
  }, [startDate, endDate]) // Recalculate whenever start or end date changes

  return (
    <Card>
      <Card.Title>Project Information Form</Card.Title>
      <Card.Description>
        Please provide details about the project.
      </Card.Description>
      <form
        noValidate
        className={styles.cardContent}
        onSubmit={(event) => {
          event.preventDefault()
          // If there are no errors
          if (!(projectTitle.length === 0 || abstract.length === 0 || fundingAgency.length === 0 || startDate.length === 0 || endDate.length === 0 || expectedTimeline.length === 0)) {
            // onSubmit({ projectTitle, abstract, fundingAgency, startDate, endDate, expectedTimeline })
            return
          }

          setHasSubmitted(true)

          // Set focus on the first input with error
          if (projectTitle.length === 0) {
            projectTitleInputRef.current?.focus()
            return
          }
          if (abstract.length === 0) {
            abstractInputRef.current?.focus()
            return
          }
          if (fundingAgency.length === 0) {
            fundingAgencyInputRef.current?.focus()
            return
          }
          if (startDate.length === 0) {
            startDateInputRef.current?.focus()
            return
          }
          if (endDate.length === 0) {
            endDateInputRef.current?.focus()
            return
          }
          if (expectedTimeline.length === 0) {
            expectedTimelineInputRef.current?.focus()
            return
          }
        }}
      >
        <FormInput
          ref={projectTitleInputRef}
          label='Project Title'
          value={projectTitle}
          type='text'
          placeholder='Enter project title'
          onChange={projectTitle => setProjectTitle(projectTitle)}
          autoFocus
          error={hasSubmitted && projectTitle.length === 0 ? 'This field is required' : undefined}
        />
        <FormTextArea
          label='Abstract'
          value={abstract}
          placeholder='Enter abstract'
          onChange={abstract => setAbstract(abstract)}
          error={hasSubmitted && abstract.length === 0 ? 'This field is required' : undefined}
        />
        <FormInput
          ref={fundingAgencyInputRef}
          label='Funding Agency'
          value={fundingAgency}
          type='text'
          placeholder='Enter funding agency'
          onChange={fundingAgency => setFundingAgency(fundingAgency)}
          error={hasSubmitted && fundingAgency.length === 0 ? 'This field is required' : undefined}
        />
        <div className='grid grid-cols-2 gap-2'>
            <FormInput
              ref={startDateInputRef}
              label='Start Date'
              value={startDate}
              type='date'
              min = {new Date().toISOString().split('T')[0]}
              onChange={startDate => setStartDate(startDate)}
              error={hasSubmitted && startDate.length === 0 ? 'This field is required' : undefined}
            />
            <FormInput
              ref={endDateInputRef}
              label='End Date'
              value={endDate}
              type='date'
              min = {new Date().toISOString().split('T')[0]}
              onChange={endDate => setEndDate(endDate)}
              error={hasSubmitted && endDate.length === 0 ? 'This field is required' : undefined}
            />
        </div>
        <FormInput
          ref={expectedTimelineInputRef}
          label='Expected Timeline'
          value={expectedTimeline}
          type='text'
          placeholder='Calculated timeline'
          onChange={expectedTimeline => setExpectedTimeline(expectedTimeline)}
          disabled
        />
      </form>
    </Card>
  )
}
