'use client';

import Input from '@/components/Input';

export default function FormField({ label, error, helperText, required, ...inputProps }) {
  return (
    <div className="form-field">
      <Input label={required ? `${label} *` : label} error={error} helperText={helperText} required={required} {...inputProps} />
    </div>
  );
}
