"use client";

import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  error?: string | null;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      id,
      wrapperClassName,
      ...props
    },
    ref,
  ) => {
    const inputElement = (
      <input
        ref={ref}
        id={id}
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base",
          "placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-1",
          "disabled:cursor-not-allowed disabled:opacity-60",
          className,
        )}
        {...props}
      />
    );

    if (!label && !error) {
      return inputElement;
    }

    return (
      <div className={cn("space-y-2", wrapperClassName)}>
        {label ? (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700"
          >
            {label}
          </label>
        ) : null}
        {inputElement}
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
export default Input;
