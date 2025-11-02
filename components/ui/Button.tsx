import { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'danger';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand hover:bg-brand-dark text-white',
  secondary: 'bg-secondary hover:brightness-90 text-white',
  danger: 'bg-red-600 hover:bg-red-700 text-white',
};

export default function Button({ variant = 'primary', className, ...props }: ButtonProps): JSX.Element {
  return (
    <button
      {...props}
      className={`rounded-lg px-4 py-2 transition-base disabled:opacity-60 ${variantClasses[variant]} ${className ?? ''}`}
    />
  );
}


