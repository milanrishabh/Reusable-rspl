import { cn } from "@lib/utils/cn";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "destructive"
    | "success"
    | "warning"
    | "error";
  size?: "sm" | "md";
}

const badgeVariants = {
  default: "bg-rspl-primary-500 text-white",
  secondary: "bg-rspl-primary-100 text-rspl-primary-500",
  outline:
    "text-rspl-neutral-500 outline outline-1 outline-offset-[-1px] outline-rspl-neutral-500 bg-transparent",
  destructive: "bg-rspl-error-100 text-rspl-error-500",
  success: "bg-rspl-success-100 text-rspl-success-500",
  warning: "bg-rspl-warning-100 text-rspl-warning-500",
  error: "bg-rspl-error-100 text-rspl-error-500",
};

const badgeSizes = {
  sm: "px-1.5 py-1 text-xs rounded-sm",
  md: "px-2 py-1.5 text-sm rounded-full",
};

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "outline",
  size = "sm",
  children,
  ...props
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-start font-medium",
        badgeVariants[variant],
        badgeSizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};
