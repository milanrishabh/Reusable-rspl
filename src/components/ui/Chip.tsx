import { clsx } from "clsx";
import { X } from "lucide-react";
import React from "react";

interface ChipProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "outline";
  size?: "sm" | "md" | "lg";
  onRemove?: () => void;
  disabled?: boolean;
  clickable?: boolean;
  className?: string;
  onClick?: () => void;
  closeClassNames?: string;
}

const chipVariants = {
  default:
    "bg-rspl-neutral-100 text-rspl-neutral-800 dark:bg-rspl-neutral-800 dark:text-rspl-neutral-200",
  primary:
    "bg-rspl-primary-100 text-rspl-primary-800 dark:bg-rspl-primary-900/30 dark:text-rspl-primary-300",
  secondary:
    "bg-rspl-secondary-100 text-rspl-secondary-800 dark:bg-rspl-secondary-900/30 dark:text-rspl-secondary-300",
  success:
    "bg-rspl-success-100 text-rspl-success-800 dark:bg-rspl-success-900/30 dark:text-rspl-success-300",
  warning:
    "bg-rspl-warning-100 text-rspl-warning-800 dark:bg-rspl-warning-900/30 dark:text-rspl-warning-300",
  error: "bg-rspl-error-100 text-rspl-error-800 dark:bg-rspl-error-900/30 dark:text-rspl-error-300",
  outline: "border border-rspl-neutral-300 text-black",
};

const chipSizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-3 py-1.5 text-sm",
  lg: "px-4 py-2 text-base",
};

export function Chip({
  children,
  variant = "default",
  size = "md",
  onRemove,
  disabled = false,
  clickable = false,
  className,
  closeClassNames,
  onClick,
}: ChipProps) {
  const isInteractive = clickable || onClick;

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full font-medium transition-colors duration-200",
        chipVariants[variant],
        chipSizes[size],
        isInteractive && !disabled && "cursor-pointer hover:opacity-80",
        disabled && "opacity-50 cursor-not-allowed",
        className,
      )}
      onClick={!disabled && onClick ? onClick : undefined}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled) {
              onRemove();
            }
          }}
          disabled={disabled}
          className={clsx(
            "ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200",
            disabled &&
              "cursor-not-allowed hover:bg-transparent dark:hover:bg-transparent",
          )}
          aria-label="Remove"
        >
          <X
            className={clsx(
              size === "sm"
                ? "w-3 h-3"
                : size === "md"
                  ? "w-3.5 h-3.5"
                  : "w-4 h-4",
              closeClassNames,
            )}
          />
        </button>
      )}
    </span>
  );
}

// Alternative name for consistency with some design systems
export const Tag = Chip;
