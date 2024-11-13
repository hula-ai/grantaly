'use client'
import React from 'react';
import { useState, useId, lazy, Suspense } from 'react';
import { NavBar } from '../components/PI-Components/multi-step/navbar/NavBar';
import StepIndicator from "../components/PI-Components/multi-step/StepIndicator"
// import PersonalInfoCard from './components-copy/registration-step-cards/PersonalInfoCard';
import styles from './PI.module.scss'
import { Plan, PlanAddon, planAddons, plans, PriceType } from '../config';
import PersonalInfoCard from '../components/PI-Components/registration-step-cards/PersonalInfoCard';
import { ProjectStep1Schema } from '@/Validation/Client/validator';
import toast from 'react-hot-toast';
import axios from 'axios';


const AddonsCard = lazy(() => import('../components/PI-Components/registration-step-cards/AddonsCard'));
const FinishingUpCard = lazy(() => import('../components/PI-Components/registration-step-cards/FinishingUpCard'));
const PlanCard = lazy(() => import('../components/PI-Components/registration-step-cards/PlanCard'));
const ThankYouCard = lazy(() => import('../components/PI-Components/registration-step-cards/ThankYouCard'));

const steps = [
  { id: '1', name: 'Project Information Form' },
  { id: '2', name: 'Meeting Booking' },
  { id: '3', name: 'Contract Management' },
  { id: '4', name: 'Summary' },
];

export default function Page() {
  const [step, setStep] = useState(2);
  const [isComplete, setIsComplete] = useState(false);
  const [projectId,setProjectId] = useState(0);

  // State for each form field
  const [projectTitle, setProjectTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [fundingAgency, setFundingAgency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expectedTimeline, setExpectedTimeline] = useState('');

  const [selectedPlan, setSelectedPlan] = useState(plans[0]);
  const [priceType, setPriceType] = useState('monthly');
  const [addons, setAddons] = useState(new Set());

  const goToNextStep = async () => {
    if(step === 0){
      const data = {projectTitle,abstract,fundingAgency,startDate,endDate,expectedTimeline};
      const { value, error } = ProjectStep1Schema.validate({projectTitle,abstract,fundingAgency,startDate,endDate,expectedTimeline}, { abortEarly: false });
      if(endDate < startDate){
        toast.error('End date cannot be before start date');
        return;
      }

      if (error) {
        // Show the first error message in a toast
        toast.error(error.details[0].message);
        return;
      }
      else {
        try {
          if(projectId) {
            const response = await axios.put(`/api/project/${projectId}/step/${step+1}`, data);  
            setProjectId(response.data.projectId);
            setStep((prevStep) => prevStep + 1)
            toast.success('Progress Saved...')
          } else {
            const response = await axios.post(`/api/project/${projectId}/step/${step+1}`, data);
            setProjectId(response.data.projectId);
            setStep((prevStep) => prevStep + 1)
            toast.success('Progress Update Saved...')
          }
        } catch (error) {
          toast.error('failed to save progress')
        }
        // setStep((prevstep) => prevstep+1 )
      }
    }

    if(step === 1){
      try {
        if(projectId) {
          const response = await axios.put(`/api/project/${projectId}/step/${step+1}`, {isBooked: true});  
          setStep((prevStep) => prevStep + 1)
          toast.success('Progress Saved...')
        } 
      } catch (error) {
        toast.error('failed to save progress')
      } 
    }

    if(step === 2){
      try {
        if(projectId) {
          const response = await axios.put(`/api/project/${projectId}/step/${step+1}`, {isBooked: true});  
          if(response.data){
            setStep((prevStep) => prevStep + 1)
            toast.success('Progress Saved...')
          }
        } 
      } catch (error) {
        toast.error('failed to save progress')
      } 
    }
  };



  const goToPrevStep = () => setStep((prevStep) => prevStep - 1);
  const goToPlanStep = () => setStep(1);
  const finish = () => setIsComplete(true);

  // Handler for updating addons
  const handleToggleAddon = (addon) => {
    const updatedAddons = new Set(addons);
    if (updatedAddons.has(addon)) {
      updatedAddons.delete(addon);
    } else {
      updatedAddons.add(addon);
    }
    setAddons(updatedAddons);
  };

  return (
    <div className='mb-80 flex justify-center' >
      <main className={styles.main}>
          <StepIndicator steps={steps} currentStep={steps[step].id} />
        
        <Suspense fallback="Loading...">
          <div className={styles.content} style={{height:'100%',alignSelf:'flex-start'}}>
            {!isComplete ? (
              <>
                <div className={styles.cardWrapper}>
                  {step === 0 && (
                    <PersonalInfoCard
                      projectTitle={projectTitle}
                      abstract={abstract}
                      fundingAgency={fundingAgency}
                      startDate={startDate}
                      endDate={endDate}
                      expectedTimeline={expectedTimeline}
                      setProjectTitle={setProjectTitle}
                      setAbstract={setAbstract}
                      setFundingAgency={setFundingAgency}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      setExpectedTimeline={setExpectedTimeline}
                  />
                  )}
                  {step === 1 && (
                    <PlanCard
                      plans={plans}
                      selectedPlan={selectedPlan}
                      onPlanChange={(plan) => setSelectedPlan(plan)}
                      selectedPriceType={priceType}
                      onPriceTypeToggle={() => setPriceType((prev) => (prev === 'monthly' ? 'yearly' : 'monthly'))}
                    />
                  )}
                  {step === 2 && (
                    <AddonsCard
                      addons={planAddons}
                      priceType={priceType}
                      checkedAddons={addons}
                      onToggleAddon={handleToggleAddon}
                    />
                  )}
                  {step === 3 && (
                    <FinishingUpCard
                      onChangePlanClick={goToPlanStep}
                      plan={selectedPlan}
                      addons={addons}
                      priceType={priceType}
                    />
                  )}
                </div>

                <NavBar
                  steps={steps.length}
                  currentStep={step}
                  isAtPersonalInfoStep={step === steps.length}
                  onBackButtonClick={goToPrevStep}
                  onNextStepButtonClick={goToNextStep}
                  onConfirmButtonClick={finish}
                />
              </>
            ) : (
              <div className={styles.thankYouCardWrapper}>
                <ThankYouCard />
              </div>
            )}
          </div>
        </Suspense>
      </main>
    </div>
  );
}
