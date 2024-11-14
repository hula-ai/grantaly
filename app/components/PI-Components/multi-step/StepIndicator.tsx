import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import styles from './StepIndicator.module.scss';

type Step = {
  id: string;
  name: string;
};

type Props = {
  steps: Step[];
  currentStep: string;
};

const StepIndicator = ({ steps, currentStep }: Props) => {
  const [applyHeight, setApplyHeight] = useState(window.innerWidth >= 1024);
  const [applyWidth, setApplyWidth] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setApplyHeight(window.innerWidth >= 1024); // Apply height if width is 994px or more
      setApplyWidth(window.innerWidth < 1024);   // Apply width if width is below 994px
    };

    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <ul
      style={{
        height: applyHeight ? '100%' : undefined,
        width: applyWidth ? '100%' : undefined,
        alignSelf: 'flex-start',
      }}
      className={styles.container}
    >
      {steps.map((step) => (
        <li key={step.id} className={styles.step}>
          <div
            className={classNames('text-body-md', styles.stepNumber, {
              [styles.active]: step.id === currentStep,
            })}
          >
            {step.id}
          </div>
          <p className={classNames('text-body-sm', styles.stepId)}>STEP {step.id}</p>
          <p className={classNames('text-body-sm', styles.stepName)}>{step.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default StepIndicator;
