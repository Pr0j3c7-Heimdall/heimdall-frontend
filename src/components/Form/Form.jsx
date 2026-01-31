'use client';

export default function Form({
  children,
  onSubmit,
  action,
  method = 'post',
  className = '',
  ...props
}) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form
      className={`form ${className}`.trim()}
      onSubmit={onSubmit ? handleSubmit : undefined}
      action={onSubmit ? undefined : action}
      method={method}
      {...props}
    >
      {children}
    </form>
  );
}
