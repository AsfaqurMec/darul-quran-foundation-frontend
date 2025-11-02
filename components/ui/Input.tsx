import { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
};

export default function Input({ label, error, id, className, ...props }: InputProps): JSX.Element {
  return (
    <div>
      {label ? (
        <label className="block text-sm font-medium mb-1" htmlFor={id}>{label}</label>
      ) : null}
      <input
        id={id}
        className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${error ? 'border-red-400' : 'border-gray-300'} ${className ?? ''}`}
        {...props}
      />
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}


