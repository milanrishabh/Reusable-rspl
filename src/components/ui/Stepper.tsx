import { Check } from "lucide-react";
import React from "react";

export interface StepperStep {
  id: number;
  title: string;
  subtitle?: string;
  isCompleted: boolean;
  isAccessible: boolean;
  isCurrent: boolean;
  isOptional?: boolean;
}

export interface StepperProps {
  steps: StepperStep[];
  onStepClick?: (stepId: number) => void;
  className?: string;
  variant?: "default" | "compact";
  showProgress?: boolean;
  id?: string;
}

const Stepper: React.FC<StepperProps> = ({
  steps,
  onStepClick,
  className = "",
  variant = "default",
  id,
}) => {
  const handleStepClick = (step: StepperStep) => {
    if (step.isAccessible && onStepClick) {
      onStepClick(step.id);
    }
  };

  const getStepIcon = (step: StepperStep) => {
    if (step.isCurrent) {
      return (
        <div className="w-8 h-8 p-2.5 bg-rspl-primary-50 dark:bg-rspl-primary-900/30 outline outline-rspl-primary-500 rounded-full flex items-center justify-center">
          <span className="text-sm font-medium text-rspl-primary-500 dark:text-rspl-primary-300">
            {step.id}
          </span>
        </div>
      );
    }

    if (step.isCompleted) {
      return (
        <div className="w-8 h-8 bg-rspl-success-600 rounded-full flex items-center justify-center">
          <Check className="w-4 h-4 text-white" />
        </div>
      );
    }

    return (
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center outline -outline-offset-1 bg-white dark:bg-rspl-neutral-900 ${
          step.isAccessible
            ? "outline-rspl-neutral-500 text-rspl-neutral-500 dark:outline-rspl-neutral-500 dark:text-rspl-neutral-300"
            : "outline-rspl-neutral-300 text-rspl-neutral-300 dark:outline-rspl-neutral-700 dark:text-rspl-neutral-600"
        }`}
      >
        <span className="text-sm font-medium text-rspl-neutral-500 dark:text-rspl-neutral-300">
          {step.id}
        </span>
      </div>
    );
  };

  const getConnectorLine = (index: number) => {
    if (index === steps.length - 1) return null;

    return (
      <div className="flex-1 mx-4 flex items-center">
        <div
          className="h-0.5 w-full"
          style={{
            background:
              "repeating-linear-gradient(to right, #7F7F7F 0px, #7F7F7F 4px, transparent 4px, transparent 8px)",
          }}
        />
      </div>
    );
  };

  if (variant === "compact") {
    return (
      <div id={id || "stepper"} className={`${className}`}>
        <div className="flex items-center gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <button
                id={`stepper-step-${step.id}`}
                onClick={() => handleStepClick(step)}
                disabled={!step.isAccessible}
                className={`flex items-center gap-2 px-2 py-2 rounded-full text-sm transition-colors  ${
                  step.isCurrent
                    ? " text-rspl-primary-500 dark:text-rspl-primary-300 hover:bg-rspl-primary-50 dark:hover:bg-rspl-primary-900/20 cursor-pointer "
                    : step.isCompleted
                      ? "text-rspl-success-800 dark:text-rspl-success-300 hover:bg-rspl-success-50 dark:hover:bg-rspl-success-900/20 cursor-pointer"
                      : step.isAccessible
                        ? " text-rspl-neutral-600 dark:text-rspl-neutral-300 hover:bg-rspl-neutral-50 dark:hover:bg-rspl-neutral-800 cursor-pointer"
                        : " text-rspl-neutral-500 dark:text-rspl-neutral-600 cursor-not-allowed"
                }`}
              >
                {getStepIcon(step)}
                <div className="inline-flex flex-col gap-1 items-start">
                  <span
                    className={`${step.isCurrent || step.isCompleted ? "font-semibold" : "font-medium"}`}
                  >
                    {step.title}
                  </span>
                  {step.isOptional && <span className="text-xs">Optional</span>}
                </div>
              </button>
              {getConnectorLine(index)}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div id={id || "stepper"} className={`${className}`}>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <button
                id={`stepper-step-${step.id}`}
                onClick={() => handleStepClick(step)}
                disabled={!step.isAccessible}
                className={`flex flex-col items-center transition-colors ${
                  step.isAccessible ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <div className="flex flex-col items-center">
                  {getStepIcon(step)}
                  <div className="mt-2 text-center">
                    <div
                      className={`text-sm font-medium whitespace-nowrap ${
                        step.isCurrent
                          ? "text-rspl-primary-600 dark:text-rspl-primary-300"
                          : step.isCompleted
                            ? "text-rspl-success-600 dark:text-rspl-success-300"
                            : "text-rspl-neutral-500 dark:text-rspl-neutral-300"
                      }`}
                    >
                      {step.title}
                    </div>
                    {step.isOptional && (
                      <div className="text-xs text-rspl-neutral-400 dark:text-rspl-neutral-500 mt-1">
                        Optional
                      </div>
                    )}
                  </div>
                </div>
              </button>
            </div>
            {getConnectorLine(index)}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
