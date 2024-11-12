import React from 'react';
import classNames from 'classnames';
import styles from './StepIndicator.module.scss'

type Step = {
  id: string;
  name: string;
};

type Props = {
  steps: Step[];
  currentStep: string;
};

const StepIndicator = ({ steps, currentStep }: Props) => {
  return (
    <ul className={styles.container}>
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
}

export default StepIndicator
