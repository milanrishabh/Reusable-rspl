import { clsx } from "clsx";
import { Info } from "lucide-react";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral"
    | "teal"
    | "lightGreen"
    | "orange";
  progressTrackVariant?:
    | "default"
    | "success"
    | "warning"
    | "error"
    | "teal"
    | "lightGreen"
    | "orange"
    | "white"
    | "secondary";
  showLabel?: boolean;
  label?: string;
  showPercentage?: boolean;
  layout?: "default" | "figma";
  showInfo?: boolean;
  labelClassNames?: string;
  percentageLabelClassNames?: string;
}

const progressSizes = {
  sm: "h-1",
  md: "h-1.5",
  lg: "h-2",
};

const progressTrackVariants = {
  default: "bg-rspl-neutral-50",
  success: "bg-rspl-success-50",
  warning: "bg-rspl-warning-50",
  error: "bg-rspl-error-50",
  teal: "bg-rspl-cyan-50",
  lightGreen: "bg-rspl-lime-50",
  orange: "bg-rspl-peach-50",
  secondary: "bg-rspl-secondary-50",
  white: "bg-white",
};

const progressVariants = {
  primary: "bg-rspl-primary-500",
  secondary: "bg-rspl-secondary-500",
  success: "bg-rspl-success-500",
  warning: "bg-rspl-warning-500",
  error: "bg-rspl-error-500",
  info: "bg-rspl-info-500",
  neutral: "bg-rspl-neutral-500",
  teal: "bg-rspl-teal-600",
  lightGreen: "bg-rspl-lime-500",
  orange: "bg-rspl-peach-500",
};

export const Progress: React.FC<ProgressProps> = ({
  className,
  value = 0,
  max = 100,
  size = "md",
  variant = "primary",
  showLabel = false,
  label,
  showPercentage = true,
  layout = "alignPercentage",
  progressTrackVariant = "default",
  showInfo = true,
  labelClassNames,
  percentageLabelClassNames,
  ...props
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  if (layout === "alignPercentage") {
    return (
      <div
        className={clsx(
          "self-stretch flex flex-col justify-start items-start gap-1",
          className,
        )}
        {...props}
      >
        {(showLabel || label) && (
          <div className="self-stretch flex flex-col justify-start items-start gap-5">
            <div className="self-stretch inline-flex justify-between items-center flex-wrap content-center">
              <p
                className={clsx(
                  "text-rspl-neutral-500 text-sm leading-none",
                  labelClassNames,
                )}
              >
                {label || "Progress"}
              </p>
              {showInfo && <Info className="size-4 text-rspl-neutral-100" />}
            </div>
          </div>
        )}
        <div className="self-stretch inline-flex justify-start items-center gap-2">
          <div
            className={clsx(
              "flex-1 inline-flex flex-col justify-start items-start gap-2.5",
              progressSizes[size],
              progressTrackVariants[progressTrackVariant],
            )}
          >
            <div
              className={clsx(
                "transition-all duration-300 ease-in-out rounded-full",
                progressSizes[size],
                progressVariants[variant],
              )}
              style={{ width: `${percentage}%` }}
              role="progressbar"
              aria-valuenow={value}
              aria-valuemax={max}
              aria-valuemin={0}
            />
          </div>
          {showPercentage && (
            <div
              className={clsx(
                "text-right justify-start text-black text-sm font-normal leading-none",
                percentageLabelClassNames,
              )}
            >
              {Math.round(percentage)}%
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium text-rspl-neutral-700 dark:text-rspl-neutral-300">
            {label || "Progress"}
          </span>
          {showPercentage && (
            <span className="text-sm text-rspl-neutral-500 dark:text-rspl-neutral-400">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={clsx(
          "w-full bg-rspl-neutral-200 dark:bg-rspl-neutral-700 rounded-full overflow-hidden",
          progressSizes[size],
          className,
        )}
        {...props}
      >
        <div
          className={clsx(
            "h-full transition-all duration-300 ease-in-out rounded-full",
            progressVariants[variant],
          )}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemax={max}
          aria-valuemin={0}
        />
      </div>
    </div>
  );
};
