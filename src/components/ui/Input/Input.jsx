'use client';

import { useId } from 'react';

const SIZES = {
  sm: 'input--sm',
  md: 'input--md',
  lg: 'input--lg'
};

export default function Input({ label, error, helperText, size = 'md', className = '', id, ...props }) {
  const generatedId = useId();
  const inputId = id || `input-${generatedId.replace(/:/g, '')}`;
  const sizeClass = SIZES[size] || SIZES.md;
  const classNames = ['input', sizeClass, error && 'input--error', className].filter(Boolean).join(' ');

  return (
    <div className="input-wrap">
      {label && (
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={classNames}
        aria-invalid={!!error}
        aria-describedby={helperText || error ? `${inputId}-desc` : undefined}
        {...props}
      />
      {(helperText || error) && (
        <p id={`${inputId}-desc`} className={error ? 'input__error' : 'input__helper'}>
          {error || helperText}
        </p>
      )}
    </div>
  );
}
