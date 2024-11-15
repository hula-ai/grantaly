import { ComponentProps, forwardRef, Ref, useId } from 'react'
import styles from './FormInput.module.scss'
import React from 'react'

type Props =
  & {
    label: string
    value: string
    error?: string
    func?: any;
    remove?: any;
    onChange: (newValue: string) => void
  }
  & Pick<
    ComponentProps<'input'>,
    'placeholder' | 'type' | 'autoFocus' | 'required'
  >

export const FormInput = forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const { label, value, onChange, error,func,remove, ...inputProps } = props
    const id = 'formInput-' + useId()

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
        <div className='flex items-center gap-2'>
        <input
          id={id}
          type='text'
          ref={ref}
          className={`${styles.input} ${error ? styles.error : ''}`}
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
          {...inputProps}
        />
        {remove && <button
                  onClick={() => {func()}}
                  style={{
                    marginLeft: '0px',
                    cursor: 'pointer',
                    backgroundColor: '#ff4d4d',
                    color: '#fff',
                    border: 'none',
                    marginTop: '0px',
                    padding: '6px 12px',
                    borderRadius: '100px',
                  }}
                >&times;</button>}
                </div>
      </div>
    )
  },
)

FormInput.displayName = 'FormInput'
