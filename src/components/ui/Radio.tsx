import { clsx } from "clsx";

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  description?: string;
  error?: string;
}

export const Radio: React.FC<RadioProps> = ({
  className,
  label,
  description,
  error,
  id,
  ...props
}) => {
  const radioId =
    id ||
    (props.name
      ? `radio-${props.name}-${props.value}`
      : `radio-${label?.toLowerCase().replace(/\s+/g, "-") || "field"}-${props.value || "option"}`);
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-2">
        <input
          type="radio"
          id={radioId}
          className={clsx(
            "mt-0.5 h-4 w-4 border-rspl-gray-300 dark:border-rspl-gray-600",
            "text-rspl-primary-500 focus:ring-rspl-primary-500 focus:ring-offset-2",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error &&
              "border-rspl-error-300 text-rspl-error-600 focus:ring-rspl-error-500",
            className,
          )}
          {...props}
        />
        {(label || description) && (
          <div className="flex-1 min-w-0">
            {label && (
              <label
                htmlFor={radioId}
                className="text-sm font-medium text-rspl-gray-700 dark:text-rspl-gray-300"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-sm text-rspl-gray-500 dark:text-rspl-gray-400">
                {description}
              </p>
            )}
          </div>
        )}
      </div>
      {error && (
        <p
          id={`${radioId}-error`}
          className="text-sm text-rspl-error-600 dark:text-rspl-error-400"
        >
          {error}
        </p>
      )}
    </div>
  );
};
