'use client'
import React from 'react';
import { useState, useId, lazy, Suspense } from 'react';
import { NavBar } from '../components/PI-Components/multi-step/navbar/NavBar';
import StepIndicator from "../components/PI-Components/multi-step/StepIndicator"
// import PersonalInfoCard from './components-copy/registration-step-cards/PersonalInfoCard';
import styles from './PI.module.scss'
import { Plan, PlanAddon, planAddons, plans, PriceType } from '../config';
import PersonalInfoCard from '../components/PI-Components/registration-step-cards/PersonalInfoCard';

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
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

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

  const goToNextStep = () => {
    if(step === 1){
// Need to implement steps
    }
    setStep((prevStep) => prevStep + 1)
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
    <div className='mb-80 flex items-center justify-center'>
      <main className={styles.main} >
        <StepIndicator steps={steps} currentStep={steps[step].id} />

        <Suspense fallback="Loading...">
          <div className={styles.content}>
            {!isComplete ? (
              <>
                <div className={styles.cardWrapper}>
                  {step === 0 && (
                    <PersonalInfoCard
                    initialProjectTitle={projectTitle}
                    initialAbstract={abstract}
                    initialFundingAgency={fundingAgency}
                    initialStartDate={startDate}
                    initialEndDate={endDate}
                    initialExpectedTimeline={expectedTimeline}
                    onSubmit={(result) => {
                      setProjectTitle(result.projectTitle);
                      setAbstract(result.abstract);
                      setFundingAgency(result.fundingAgency);
                      setStartDate(result.startDate);
                      setEndDate(result.endDate);
                      setExpectedTimeline(result.expectedTimeline);
                      goToNextStep();
                    }}
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
