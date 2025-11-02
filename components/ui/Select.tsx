import { SelectHTMLAttributes } from 'react';

export type SelectOption = { value: string; label: string };

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  error?: string | null;
  options: ReadonlyArray<SelectOption>;
};

export default function Select({ label, hint, error, id, className, options, ...props }: SelectProps): JSX.Element {
  return (
    <div>
      {label ? (
        <label className="block text-sm font-medium mb-1" htmlFor={id}>{label}</label>
      ) : null}
      <div className={`relative`}> 
        <select
          id={id}
          className={`w-full appearance-none rounded-lg border px-3 py-2 pr-9 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent ${error ? 'border-red-400' : 'border-gray-300'} ${className ?? ''}`}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.17l3.71-3.94a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06Z" clipRule="evenodd" /></svg>
        </span>
      </div>
      {hint ? <p className="mt-1 text-xs text-gray-500">{hint}</p> : null}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  );
}


