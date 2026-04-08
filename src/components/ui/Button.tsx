import { clsx } from "clsx";
import { forwardRef } from "react";

import { Tooltip } from "./Tooltip";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "destructive"
    | "flow";
  size?: "xsm" | "sm" | "md" | "lg" | "iconMd";
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  tooltipPosition?: "top" | "bottom" | "left" | "right";
}

const buttonVariants = {
  primary:
    "bg-rspl-primary-500 dark:bg-rspl-primary-800 text-white hover:bg-rspl-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rspl-primary-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5",
  secondary:
    "bg-rspl-secondary-600 dark:bg-rspl-secondary-800 text-white hover:bg-rspl-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-rspl-secondary-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5",
  flow: "bg-teal-600 dark:bg-teal-800 text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-teal-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5",
  ghost:
    "text-rspl-neutral-600  dark:text-rspl-neutral-300 hover:bg-rspl-primary-50 hover:text-rspl-primary-700 dark:hover:bg-rspl-neutral-800 transition-all duration-300",
  outline:
    "outline outline-offset-[-1px] outline-rspl-neutral-100 text-rspl-neutral-500 hover:bg-rspl-primary-50 hover:border-rspl-primary-500 dark:border-rspl-primary-600 dark:text-rspl-primary-400 dark:hover:bg-rspl-primary-900 focus:ring-rspl-primary-500 transition-all duration-300",
  destructive:
    "bg-rspl-error-600 text-white hover:bg-rspl-error-700 focus:outline-none focus:ring-2 focus:ring-offset-2  focus:ring-rspl-error-500 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5",
};

const buttonSizes = {
  xsm: "p-2",
  sm: "px-3 py-1.5 text-sm",
  md: "px-6 py-2 text-sm",
  lg: "px-6 py-2 text-base",
  iconMd: "size-9 p-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      children,
      id,
      tooltip,
      tooltipPosition = "top",
      ...props
    },
    ref,
  ) => {
    const button = (
      <button
        ref={ref}
        id={id || `btn-${variant}-${size}`}
        className={clsx(
          "inline-flex items-center justify-center rounded-md font-normal transition-colors duration-200 leading-tight cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          buttonVariants[variant],
          buttonSizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );

    if (tooltip) {
      return (
        <Tooltip content={tooltip} position={tooltipPosition}>
          {button}
        </Tooltip>
      );
    }

    return button;
  },
);

Button.displayName = "Button";
