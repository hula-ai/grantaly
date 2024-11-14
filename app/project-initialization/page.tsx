'use client'
import React from 'react';
import { useState, useId, lazy, Suspense } from 'react';
import { NavBar } from '../components/PI-Components/multi-step/navbar/NavBar';
import StepIndicator from "../components/PI-Components/multi-step/StepIndicator"
import styles from './PI.module.scss'
import { plans } from '../config';
import PersonalInfoCard from '../components/PI-Components/registration-step-cards/PersonalInfoCard';
import { ProjectStep1Schema } from '@/Validation/Client/validator';
import toast from 'react-hot-toast';
import axios from 'axios';
import DocumentUpload from '@/components/PI-Components/registration-step-cards/DocumentUpload';
import { DataUploadLink, File } from '@/interface/interface';
import DataUpload from '../components/PI-Components/registration-step-cards/FinishingUpCard';
import ResultDelivery from '@/components/PI-Components/registration-step-cards/ResultDelivery';


const AddonsCard = lazy(() => import('../components/PI-Components/registration-step-cards/AddonsCard'));
const FinishingUpCard = lazy(() => import('../components/PI-Components/registration-step-cards/FinishingUpCard'));
const PlanCard = lazy(() => import('../components/PI-Components/registration-step-cards/PlanCard'));
const ThankYouCard = lazy(() => import('../components/PI-Components/registration-step-cards/ThankYouCard'));

const steps = [
  { id: '1', name: 'Project Information Form' },
  { id: '2', name: 'Meeting Booking' },
  { id: '3', name: 'Contract Management' },
  { id: '4', name: 'Data Upload' },
  { id: '5', name: 'Result Delivery' },
];

export default function Page() {
  const [step, setStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [projectId,setProjectId] = useState(0);

  // State for each form field
  const [projectTitle, setProjectTitle] = useState('');
  const [abstract, setAbstract] = useState('');
  const [fundingAgency, setFundingAgency] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [expectedTimeline, setExpectedTimeline] = useState('');

  // Step3 UseStates
  const [clientDocs, setClientDocs] = useState<File[]>([]);
  const [adminDocs, setAdminDocs] = useState<File[]>([]);

  // Step 4 Urls
  const [dataUploadContent,setDataUploadContent] = useState<DataUploadLink[]>([]);
  const [resultContent,setResultContent] = useState<DataUploadLink[]>([])

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
      if(adminDocs && adminDocs.length === 0){
        toast.error("You can't progress until admin uploads a contract");
        return;
      }
      if(clientDocs.length === 0 && adminDocs.length === 0){
        toast.error('Please upload at least one document')
        return;
      }
      
      try {
        if(projectId) {
          const response = await axios.put(`/api/project/${projectId}/step/${step+1}`, {clientDocs,adminDocs});  
          if(response.data){
            setStep((prevStep) => prevStep + 1)
            toast.success('Progress Saved...')
          }
        } 
      } catch (error) {
        toast.error('failed to save progress')
      } 
    }

    const validateUrls = (e:DataUploadLink[]) => {
      if (
          e.length === 0 ||
          e.some((data) => data.url.trim() === '' || data.description.trim() === '')
      ) {
          toast.error('Please ensure all URLs and descriptions are filled in, and that you have at least one entry.');
          return false;
      }
      return true;
  };

    if(step === 3){
      if (!validateUrls(dataUploadContent)){
        return;
      }
      try {
          const response = await axios.put(`/api/project/${projectId}/step/${step+1}`, {dataUploadContent});  
          if(response.data){
            setStep((prevStep) => prevStep + 1)
            toast.success('Progress Saved...')
          }
      } catch (error) {
        toast.error('failed to save progress')
      } 
    }

    if(step === 4){
      if (!validateUrls(resultContent)){
        return;
      }
      try {
          const response = await axios.put(`/api/project/${projectId}/step/${step+1}`, {resultContent});  
          if(response.data){
            setStep((prevStep) => prevStep + 1)
            toast.success('Progress Saved...')
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
          <div className={styles.content} style={{height:'100%',alignSelf:'center'}}>
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
                    <PlanCard/>
                  )}
                  {step === 2 && (
                    <DocumentUpload adminDocs={adminDocs} clientDocs={clientDocs} setAdminDocs={setAdminDocs} setClientDocs={setClientDocs}/>
                  )}
                  {step === 3 && (
                    <DataUpload
                      dataUploadContent={dataUploadContent}
                      setDataUploadContent={setDataUploadContent}
                    />
                  )}
                  {step === 4 && (
                    <ResultDelivery
                      resultContent={resultContent}
                      setResultContent={setResultContent}
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
