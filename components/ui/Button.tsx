import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils";

type Variant =
  | "default"
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "ghost"
  | "link";

type Size = "default" | "sm" | "lg" | "icon";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  default: "bg-brand hover:bg-brand-dark text-white",
  primary: "bg-brand hover:bg-brand-dark text-white",
  secondary: "bg-secondary hover:brightness-90 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  outline:
    "border border-gray-300 bg-white text-gray-900 hover:bg-gray-50 hover:text-gray-900",
  ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
  link: "text-brand underline-offset-4 hover:underline bg-transparent",
};

const sizeClasses: Record<Size, string> = {
  default: "h-10 px-4 py-2",
  sm: "h-9 px-3 rounded-md text-sm",
  lg: "h-11 px-8 rounded-lg text-base",
  icon: "h-10 w-10",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "default",
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : "button";

    const variantClass = variantClasses[variant] ?? variantClasses.primary;
    const sizeClass = sizeClasses[size] ?? sizeClasses.default;

    return (
      <Component
        ref={ref}
        className={cn(baseClasses, variantClass, sizeClass, className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button };
export default Button;
