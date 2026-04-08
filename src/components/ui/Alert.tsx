import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import React from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
}

const variantStyles: Record<AlertVariant, string> = {
  info: "bg-rspl-info-50 border-rspl-info-200 text-rspl-info-700 dark:bg-rspl-info-900/20 dark:border-rspl-info-700 dark:text-rspl-info-300",
  success:
    "bg-rspl-success-50 border-rspl-success-200 text-rspl-success-700 dark:bg-rspl-success-900/20 dark:border-rspl-success-700 dark:text-rspl-success-300",
  warning:
    "bg-rspl-warning-50 border-rspl-warning-200 text-rspl-warning-700 dark:bg-rspl-warning-900/20 dark:border-rspl-warning-700 dark:text-rspl-warning-300",
  error:
    "bg-rspl-error-50 border-rspl-error-200 text-rspl-error-700 dark:bg-rspl-error-900/20 dark:border-rspl-error-700 dark:text-rspl-error-300",
};

const variantIcons: Record<AlertVariant, React.ReactNode> = {
  info: <Info className="w-4 h-4 text-rspl-info-500 flex-shrink-0" />,
  success: (
    <CheckCircle className="w-4 h-4 text-rspl-success-500 flex-shrink-0" />
  ),
  warning: (
    <AlertCircle className="w-4 h-4 text-rspl-warning-500 flex-shrink-0" />
  ),
  error: <XCircle className="w-4 h-4 text-rspl-error-500 flex-shrink-0" />,
};

const Alert: React.FC<AlertProps> = ({
  variant = "info",
  children,
  className = "",
  icon,
  showIcon = true,
}) => {
  const iconToShow = icon || variantIcons[variant];

  return (
    <div
      className={`flex items-start gap-2 p-3 border rounded-lg ${variantStyles[variant]} ${className}`}
    >
      {showIcon && iconToShow}
      <div className="text-xs mt-0.5 font-normal leading-tight flex-1">
        {children}
      </div>
    </div>
  );
};

export default Alert;
