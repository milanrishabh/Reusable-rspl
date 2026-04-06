import clsx from "clsx";
import React from "react";
// Status Badge Component for table cells
export interface StatusBadgeProps {
  status:
    | "draft"
    | "planned"
    | "reviewing"
    | "negotiating"
    | "pending"
    | "approved"
    | "active"
    | "rejected"
    | "completed"
    | "archived"
    | string;
  children: React.ReactNode;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  children,
}) => {
  const statusClasses = {
    draft: "bg-rspl-neutral-50 text-rspl-neutral-500",
    planned: "bg-rspl-purple-50 text-rspl-purple-500",
    reviewing: "bg-rspl-primary-50 text-rspl-primary-500",
    negotiating: "bg-rspl-orange-warning-50 text-rspl-orange-warning-800",
    pending: "bg-rspl-warning-50 text-rspl-warning-500",
    approved: "bg-rspl-success-100 text-rspl-success-500",
    rejected: "bg-rspl-error-100 text-rspl-error-500",
    active: "bg-rspl-light-green-50 text-rspl-light-green-500",
    archived: "bg-rspl-blush-grey-50 text-rspl-blush-grey-500 ",
    completed: "bg-rspl-purple-warning-50 text-rspl-purple-warning-500",
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        statusClasses[status as keyof typeof statusClasses] ||
          "bg-rspl-neutral-50 text-rspl-neutral-500",
      )}
    >
      <div
        className={clsx("w-2 h-2 rounded-full mr-1", {
          "bg-rspl-neutral-500": status === "draft",
          "bg-rspl-purple-500": status === "planned",
          "bg-rspl-primary-500": status === "reviewing",
          "bg-rspl-orange-warning-800": status === "negotiating",
          "bg-rspl-warning-500": status === "pending",
          "bg-rspl-success-500": status === "approved",
          "bg-rspl-error-500": status === "rejected",
          "bg-rspl-light-green-500": status === "active",
          "bg-rspl-blush-grey-500": status === "archived",
          "bg-rspl-purple-warning-500": status === "completed",
        })}
      />
      {children}
    </span>
  );
};
