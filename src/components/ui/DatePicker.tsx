import { useClickOutside } from "@lib/hooks/useClickOutside";
import { formatDisplayDate } from "@lib/utils/dateUtils";
import { clsx } from "clsx";
import { Calendar } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { Label } from "./Label";

interface DatePickerProps {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
  helpText?: string;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value = "",
  onChange,
  placeholder = "Select date range",
  className,
  error,
  helpText,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => setIsOpen(false), []);
  useClickOutside(dropdownRef, isOpen, handleClose);

  useEffect(() => {
    if (!value || !value.includes(" - ")) return;
    const [start, end] = value.split(" - ");
    if (!start || !end) return;
    const startParts = start.split("/");
    const endParts = end.split("/");
    if (startParts.length === 3 && endParts.length === 3) {
      setStartDate(
        `${startParts[2]}-${startParts[1].padStart(2, "0")}-${startParts[0].padStart(2, "0")}`,
      );
      setEndDate(
        `${endParts[2]}-${endParts[1].padStart(2, "0")}-${endParts[0].padStart(2, "0")}`,
      );
    }
  }, [value]);

  const formatDateForDisplay = useCallback((date: string) => {
    if (!date) return "";
    try {
      return formatDisplayDate(date);
    } catch {
      return "";
    }
  }, []);

  const handleDateChange = useCallback(
    (type: "start" | "end", newDate: string) => {
      if (type === "start") {
        setStartDate(newDate);
      } else {
        setEndDate(newDate);
      }
      const start = type === "start" ? newDate : startDate;
      const end = type === "end" ? newDate : endDate;
      if (start && end && onChange) {
        const formattedValue = `${formatDateForDisplay(start)} - ${formatDateForDisplay(end)}`;
        onChange(formattedValue);
      }
    },
    [startDate, endDate, onChange, formatDateForDisplay],
  );

  const handleApply = useCallback(() => {
    if (startDate && endDate && onChange) {
      const formattedValue = `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`;
      onChange(formattedValue);
    }
    setIsOpen(false);
  }, [startDate, endDate, onChange, formatDateForDisplay]);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);

  const displayValue =
    value ||
    (startDate && endDate
      ? `${formatDateForDisplay(startDate)} - ${formatDateForDisplay(endDate)}`
      : "");

  return (
    <div className="space-y-2">
      {label && <Label>{label}</Label>}
      <div className="relative" ref={dropdownRef}>
        <input
          type="text"
          value={displayValue}
          placeholder={placeholder}
          readOnly
          onClick={toggleOpen}
          className={clsx(
            "block w-full px-3 py-2 border rounded-md shadow-sm cursor-pointer",
            "focus:outline-none focus:ring-1 focus:ring-rspl-primary-500 focus:border-transparent",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            error
              ? "border-rspl-error-300 text-rspl-error-500 placeholder-rspl-error-300 focus:ring-rspl-error-500"
              : "border-rspl-neutral-100 dark:border-rspl-neutral-600 text-rspl-neutral-900 dark:text-white placeholder-rspl-neutral-400",
            "dark:bg-rspl-neutral-800",
            className,
          )}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="w-4 h-4 text-rspl-neutral-400" />
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-2 min-w-[320px] rounded-md border border-rspl-neutral-100 dark:border-rspl-neutral-700 bg-white dark:bg-rspl-neutral-800 p-4 shadow-lg">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label>Start Date</Label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => handleDateChange("start", e.target.value)}
                  className="w-full rounded border border-rspl-neutral-100 dark:border-rspl-neutral-600 bg-white dark:bg-rspl-neutral-900 px-2 py-1 text-sm text-rspl-neutral-900 dark:text-rspl-neutral-100 focus:outline-none focus:ring-1 focus:ring-rspl-primary-500"
                />
              </div>
              <div>
                <Label>End Date</Label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => handleDateChange("end", e.target.value)}
                  min={startDate}
                  className="w-full rounded border border-rspl-neutral-100 dark:border-rspl-neutral-600 bg-white dark:bg-rspl-neutral-900 px-2 py-1 text-sm text-rspl-neutral-900 dark:text-rspl-neutral-100 focus:outline-none focus:ring-1 focus:ring-rspl-primary-500"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-3 py-1 text-xs text-rspl-neutral-600 dark:text-rspl-neutral-400 hover:text-rspl-neutral-800 dark:hover:text-rspl-neutral-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleApply}
                disabled={!startDate || !endDate}
                className="px-3 py-1 text-xs bg-rspl-primary-600 text-white rounded hover:bg-rspl-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className="text-sm text-rspl-error-500 dark:text-rspl-error-400">
          {error}
        </p>
      )}
      {helpText && !error && (
        <p className="text-sm text-rspl-neutral-500 dark:text-rspl-neutral-400">
          {helpText}
        </p>
      )}
    </div>
  );
};
