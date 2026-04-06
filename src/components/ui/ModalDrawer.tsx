import { clsx } from "clsx";
import { ArrowLeft, X } from "lucide-react";
import React, { useEffect } from "react";

export interface ModalDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  position?: "left" | "right";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "custom";
  customWidth?: string; // Custom width when size is "custom"
  showCloseButton?: boolean;
  showBackButton?: boolean;
  id?: string;
}

const drawerSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
};

export const ModalDrawer: React.FC<ModalDrawerProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  position = "right",
  size = "md",
  customWidth,
  showCloseButton = true,
  showBackButton = true,
  id,
}) => {
  // Close drawer on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when drawer is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const drawerId = id || "modal-drawer";
  return (
    <div id={drawerId} className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        id={`${drawerId}-backdrop`}
        className={clsx(
          "fixed inset-0 transition-all duration-300 cursor-pointer",
          isOpen
            ? "backdrop-brightness-50 bg-rspl-neutral-100/10"
            : "bg-rspl-neutral-100/0",
        )}
        onClick={onClose}
      />

      {/* Drawer container */}
      <div
        id={`${drawerId}-container`}
        className="fixed inset-0 overflow-hidden"
      >
        <div
          className={clsx(
            "absolute inset-y-0 flex max-w-full",
            position === "right" ? "right-0 pl-10" : "left-0 pr-10",
          )}
        >
          <div
            id={`${drawerId}-panel`}
            className={clsx(
              "relative w-screen transform transition-transform duration-300 ease-in-out",
              size === "custom" && customWidth
                ? ""
                : drawerSizes[size as keyof typeof drawerSizes],
              isOpen
                ? "translate-x-0"
                : position === "right"
                  ? "translate-x-full"
                  : "-translate-x-full",
            )}
            style={
              size === "custom" && customWidth
                ? { maxWidth: customWidth }
                : undefined
            }
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-full flex-col bg-white dark:bg-rspl-neutral-800 shadow-xl">
              {/* Header */}
              <div
                id={`${drawerId}-header`}
                className="self-stretch inline-flex justify-start items-center px-4 py-4 border-b border-rspl-neutral-100 dark:border-rspl-neutral-700"
              >
                <div className="flex-1 inline-flex justify-start gap-2">
                  {showBackButton && (
                    <button
                      onClick={onClose}
                      className="text-black transition-colors cursor-pointer"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                  )}
                  {title && (
                    <h4
                      id={`${drawerId}-title`}
                      className="text-xl font-medium text-rspl-neutral-800 dark:text-white leading-8"
                    >
                      {title}
                    </h4>
                  )}
                </div>
                <div className="text-center justify-start">
                  {showCloseButton && (
                    <button
                      id={`${drawerId}-close`}
                      onClick={onClose}
                      className="text-black transition-colors cursor-pointer justify-end"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Content */}
              <div
                id={`${drawerId}-content`}
                className="flex-1 overflow-y-auto scrollbar-thin"
              >
                <div className="p-4 h-full">{children}</div>
              </div>

              {/* Footer */}
              {footer && (
                <div
                  id={`${drawerId}-footer`}
                  className="border-t border-rspl-neutral-100 dark:border-rspl-neutral-700 px-4 py-4 bg-white dark:bg-rspl-neutral-800"
                >
                  {footer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDrawer;
