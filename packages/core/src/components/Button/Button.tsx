import React, { forwardRef } from 'react';
import { ButtonProps } from '../../types';
import { cn } from '../../utils/classNames';
import styles from './Button.module.css';

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      disabled = false,
      loading = false,
      fullWidth = false,
      type = 'button',
      className,
      'data-testid': testId,
      ...props
    },
    ref
  ) => {
    const buttonClasses = cn(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      {
        [styles['button--full-width']]: fullWidth,
        [styles['button--loading']]: loading,
        [styles['button--disabled']]: disabled,
      },
      className
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={buttonClasses}
        data-testid={testId}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <span className={styles.spinner} aria-hidden="true">
            <svg
              className={styles.spinnerIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="31.416"
                strokeDashoffset="31.416"
              />
            </svg>
          </span>
        )}
        <span className={styles.content}>{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';