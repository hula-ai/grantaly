import { ComponentProps, forwardRef, Ref, useId } from 'react'
import styles from './textarea.module.scss'
import React from 'react'

type Props =
  & {
    label: string
    value: string
    error?: string
    onChange: (newValue: string) => void
  }
  & Pick<
    ComponentProps<'textarea'>,
    'placeholder' | 'autoFocus' | 'required'
  >

export const FormTextArea = forwardRef<HTMLTextAreaElement, Props>(
  (props, ref) => {
    const { label, value, onChange, error, ...textareaProps } = props
    const id = 'formTextArea-' + useId()

    return (
      <div className={styles.container}>
        <div className={styles.labelContainer}>
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
          {error && (
            <p className={styles.errorMessage} aria-live='polite'>{error}</p>
          )}
        </div>
        <textarea
          id={id}
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''}`}
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
          {...textareaProps}
        />
      </div>
    )
  },
)

FormTextArea.displayName = 'FormTextArea'
