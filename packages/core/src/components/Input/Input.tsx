import React, { forwardRef, useState } from 'react';
import { InputProps } from '../../types';
import { cn } from '../../utils/classNames';
import styles from './Input.module.css';

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      placeholder,
      value,
      defaultValue,
      disabled = false,
      required = false,
      error = false,
      helperText,
      label,
      fullWidth = false,
      className,
      'data-testid': testId,
      id,
      ...props
    },
    ref
  ) => {
    const [inputId] = useState(() => id || `input-${Math.random().toString(36).substr(2, 9)}`);
    const [helperId] = useState(() => `helper-${inputId}`);
    const [errorId] = useState(() => `error-${inputId}`);

    const inputClasses = cn(
      styles.input,
      {
        [styles['input--error']]: error,
        [styles['input--full-width']]: fullWidth,
        [styles['input--disabled']]: disabled,
      },
      className
    );

    const containerClasses = cn(
      styles.container,
      {
        [styles['container--full-width']]: fullWidth,
      }
    );

    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}
        
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            className={inputClasses}
            data-testid={testId}
            aria-invalid={error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            {...props}
          />
        </div>

        {error && (
          <div id={errorId} className={styles.error} role="alert">
            {helperText}
          </div>
        )}

        {helperText && !error && (
          <div id={helperId} className={styles.helper}>
            {helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';