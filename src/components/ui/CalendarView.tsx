import {
  getDaysInMonth,
  getStartOfWeek,
  formatMonthYear,
  isSameDay,
  formatWeekRange,
  getFirstDayOfMonth,
} from "@lib/utils/dateUtils";
import { clsx } from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useMemo, useCallback } from "react";

import { Button } from "./Button";
import { Tooltip } from "./Tooltip";

// Types
export type CalendarViewMode = "monthly" | "weekly" | "daily";

// Calendar event interface
export interface CalendarEvent {
  date: Date;
  customContent?: React.ReactNode; // Custom content to render in the cell
  tooltipContent?: React.ReactNode; // Tooltip content (wraps customContent if provided)
  backgroundColor?: string; // Background color class (e.g., "bg-emerald-50", "bg-rspl-error-50")
}

// Grid cell data interface
export interface GridCellData {
  rowId: string;
  date?: Date; // For weekly view
  hour?: number; // For daily view
  customContent?: React.ReactNode; // Custom content to render in the cell
  tooltipContent?: React.ReactNode; // Tooltip content (wraps customContent if provided)
  backgroundColor?: string; // Background color class (e.g., "bg-emerald-50", "bg-rspl-error-50")
}

// Hourly event interface
export interface HourlyEvent {
  hour: number; // 0-23
  customContent?: React.ReactNode; // Custom content to render in the cell
  tooltipContent?: React.ReactNode; // Tooltip content (wraps customContent if provided)
  backgroundColor?: string; // Background color class (e.g., "bg-emerald-50", "bg-rspl-error-50")
}

// Row data for multi-row grid views (weekly/daily with detail column)
export interface RowData {
  id: string;
  label: string; // e.g., "Slot 01", "Slot 02"
  count?: number; // Optional count to display (e.g., 279, 744)
  customContent?: React.ReactNode; // Custom content for the row label cell
}

// Detail column configuration for weekly/daily views
export interface DetailColumnConfig {
  header?: string; // Header text for the detail column
  width?: string; // Width of the detail column (e.g., "80px", "100px")
  className?: string; // Additional classes for the detail column
}

export interface CalendarViewProps {
  viewMode?: CalendarViewMode;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  events?: CalendarEvent[];
  hourlyEvents?: HourlyEvent[];
  selectedDate?: Date;
  onDateChange?: (date: Date) => void;
  onCellClick?: (
    date: Date,
    event?: CalendarEvent | HourlyEvent,
    rowId?: string,
  ) => void;
  className?: string;
  showViewToggle?: boolean;
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6; // 0 = Sunday, 1 = Monday
  // Detail column props (for weekly and daily views)
  showDetailColumn?: boolean;
  detailColumnConfig?: DetailColumnConfig;
  rows?: RowData[]; // Row data for multi-row grid
  gridData?: GridCellData[]; // Cell data for multi-row grid
  onGridCellClick?: (
    rowId: string,
    date?: Date,
    hour?: number,
    cellData?: GridCellData,
  ) => void;
  calendarTitle?: string;
  colorPaletteInfo?: ColorPaletteInfo[];
  highlightSelectedDate?: boolean; // Whether to highlight the selected date
  highlightCurrentDate?: boolean; // Whether to highlight the current date (today)
  minDate?: Date; // Minimum date for navigation
  maxDate?: Date; // Maximum date for navigation
}

const DAY_NAMES_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface CalendarCellProps {
  date: Date;
  event?: CalendarEvent;
  isCurrentMonth: boolean;
  isSelected: boolean;
  isToday?: boolean;
  highlightSelected?: boolean;
  highlightToday?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  disabled?: boolean;
}

const CalendarCell: React.FC<CalendarCellProps> = ({
  date,
  event,
  isCurrentMonth,
  isSelected,
  isToday = false,
  highlightSelected = false,
  highlightToday = false,
  onClick,
  children,
  disabled = false,
}) => {
  // Only render customContent if provided, otherwise render children or nothing
  const cellContent = event?.customContent || children || null;

  // Wrap with Tooltip if tooltipContent is provided
  const wrappedContent =
    event?.tooltipContent && cellContent ? (
      <Tooltip content={event.tooltipContent} position="bottom">
        <div className="w-full">{cellContent}</div>
      </Tooltip>
    ) : (
      cellContent
    );

  return (
    <div
      className={clsx(
        "relative min-h-[100px] border-b border-r border-container-border p-2 transition-colors",
        !disabled && "cursor-pointer",
        disabled &&
          "cursor-not-allowed opacity-50 bg-rspl-neutral-50 dark:bg-rspl-neutral-800",
        !isCurrentMonth &&
          !disabled &&
          "bg-rspl-neutral-50 dark:bg-rspl-neutral-800",
        isCurrentMonth &&
          !disabled &&
          event?.backgroundColor &&
          event.backgroundColor,
        isSelected &&
          highlightSelected &&
          !disabled &&
          "ring-2 ring-inset ring-blue-500 ring-dashed",
        !event?.backgroundColor &&
          !disabled &&
          "hover:bg-rspl-neutral-50 dark:hover:bg-rspl-neutral-700",
        !isCurrentMonth &&
          !disabled &&
          "text-rspl-neutral-400 dark:text-rspl-neutral-500 pointer-events-none bg-rspl-neutral-50 dark:bg-rspl-neutral-800",
      )}
      onClick={disabled ? undefined : onClick}
    >
      {/* Date number */}
      <div
        className={clsx(
          "text-sm font-medium mb-1",
          (!isCurrentMonth || disabled) &&
            "text-rspl-neutral-400 dark:text-rspl-neutral-500",
          isCurrentMonth &&
            !disabled &&
            "text-rspl-neutral-900 dark:text-rspl-neutral-100",
          isToday && highlightToday && !disabled && "text-blue-600",
        )}
      >
        {String(date.getDate()).padStart(2, "0")}
      </div>
      {wrappedContent}
    </div>
  );
};

// Grid Cell for multi-row views
interface GridCellProps {
  cellData?: GridCellData;
  isSelected?: boolean;
  highlightSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const GridCell: React.FC<GridCellProps> = ({
  cellData,
  isSelected,
  highlightSelected = false,
  onClick,
  disabled = false,
}) => {
  // Only render customContent if provided
  const cellContent = cellData?.customContent || null;

  // Wrap with Tooltip if tooltipContent is provided
  const wrappedContent =
    cellData?.tooltipContent && cellContent ? (
      <Tooltip content={cellData.tooltipContent} position="bottom">
        <div className="w-full h-full">{cellContent}</div>
      </Tooltip>
    ) : (
      cellContent
    );

  return (
    <div
      className={clsx(
        "relative h-[48px] w-full border-b border-r border-container-border p-2 transition-colors flex items-center",
        !disabled && "cursor-pointer",
        disabled &&
          "cursor-not-allowed opacity-50 bg-rspl-neutral-50 dark:bg-rspl-neutral-800",
        cellData?.backgroundColor && !disabled && cellData.backgroundColor,
        isSelected &&
          highlightSelected &&
          !disabled &&
          "ring-2 ring-inset ring-blue-500 ring-dashed",
        !cellData?.backgroundColor &&
          !disabled &&
          "hover:bg-rspl-neutral-50 dark:hover:bg-rspl-neutral-700",
      )}
      onClick={disabled ? undefined : onClick}
    >
      {wrappedContent}
    </div>
  );
};

// Row Label Cell for detail column
interface RowLabelCellProps {
  row: RowData;
  className?: string;
}

const RowLabelCell: React.FC<RowLabelCellProps> = ({ row, className }) => {
  return (
    <div
      className={clsx(
        "h-[48px] border-b border-r border-container-border p-2 flex flex-col justify-center bg-white",
        "dark:bg-rspl-neutral-900",
        className,
      )}
    >
      {row.customContent ? (
        row.customContent
      ) : (
        <>
          {row.count !== undefined && (
            <div className="bg-rspl-error-100 text-rspl-error-700 text-xs font-medium px-1.5 py-0.5 rounded w-fit mb-1">
              {row.count}
            </div>
          )}
          <Tooltip content={row.label} position="right">
            <div className="text-sm font-medium text-rspl-neutral-900 dark:text-rspl-neutral-100 truncate">
              {row.label}
            </div>
          </Tooltip>
        </>
      )}
    </div>
  );
};

interface HourlyCellProps {
  hour?: number;
  event?: HourlyEvent;
  isSelected: boolean;
  highlightSelected?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const HourlyCell: React.FC<HourlyCellProps> = ({
  event,
  isSelected,
  highlightSelected = false,
  onClick,
  disabled = false,
}) => {
  // Only render customContent if provided
  const cellContent = event?.customContent || null;

  // Wrap with Tooltip if tooltipContent is provided
  const wrappedContent =
    event?.tooltipContent && cellContent ? (
      <Tooltip content={event.tooltipContent} position="bottom">
        <div className="w-full h-full">{cellContent}</div>
      </Tooltip>
    ) : (
      cellContent
    );

  return (
    <div
      className={clsx(
        "min-h-[80px] w-full border-b border-r border-container-border p-2 transition-colors",
        !disabled && "cursor-pointer",
        disabled &&
          "cursor-not-allowed opacity-50 bg-rspl-neutral-50 dark:bg-rspl-neutral-800",
        event?.backgroundColor && !disabled && event.backgroundColor,
        isSelected &&
          highlightSelected &&
          !disabled &&
          "ring-2 ring-inset ring-blue-500 ring-dashed",
        !event?.backgroundColor &&
          !disabled &&
          "hover:bg-rspl-neutral-50 dark:hover:bg-rspl-neutral-700",
      )}
      onClick={disabled ? undefined : onClick}
    >
      {wrappedContent}
    </div>
  );
};

// View Toggle Component
interface ViewToggleProps {
  viewMode: CalendarViewMode;
  onViewModeChange: (mode: CalendarViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const views: { mode: CalendarViewMode; label: string }[] = [
    { mode: "monthly", label: "Monthly" },
    { mode: "weekly", label: "Weekly" },
    { mode: "daily", label: "Daily" },
  ];

  return (
    <div
      className="flex items-center bg-rspl-neutral-50 dark:bg-rspl-neutral-800 rounded-lg p-1"
      role="group"
      aria-label="Calendar view"
    >
      {views.map(({ mode, label }) => (
        <button
          key={mode}
          type="button"
          onClick={() => onViewModeChange(mode)}
          aria-pressed={viewMode === mode}
          className={clsx(
            "px-4 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer",
            viewMode === mode
              ? "bg-rspl-primary-500 text-white shadow-sm"
              : "text-rspl-neutral-600 dark:text-rspl-neutral-300 hover:text-rspl-neutral-900 dark:hover:text-rspl-neutral-100 hover:bg-rspl-neutral-200 dark:hover:bg-rspl-neutral-700",
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export interface ColorPaletteInfo {
  label: string;
  color: string;
}

const COLOR_PALETTE_CLASS_MAP: Record<string, string> = {
  "rspl-primary-50": "bg-rspl-primary-50 dark:bg-rspl-primary-900/20",
  "rspl-primary-100": "bg-rspl-primary-100 dark:bg-rspl-primary-900/30",
  "rspl-error-50": "bg-rspl-error-50 dark:bg-rspl-error-900/20",
  "rspl-error-100": "bg-rspl-error-100 dark:bg-rspl-error-900/30",
  "rspl-neutral-50": "bg-rspl-neutral-50 dark:bg-rspl-neutral-800",
  "rspl-neutral-100": "bg-rspl-neutral-100 dark:bg-rspl-neutral-700",
  "emerald-50": "bg-emerald-50",
  "emerald-100": "bg-emerald-100",
  white: "bg-white dark:bg-rspl-neutral-900",
};

function getColorBoxClass(colorKey: string): string {
  return (
    COLOR_PALETTE_CLASS_MAP[colorKey] ??
    "bg-rspl-neutral-100 dark:bg-rspl-neutral-700"
  );
}

// Navigation Header
interface NavigationHeaderProps {
  title: string;
  onPrevious: () => void;
  onNext: () => void;
  viewMode: CalendarViewMode;
  onViewModeChange?: (mode: CalendarViewMode) => void;
  showViewToggle?: boolean;
  calendarTitle?: string;
  colorPaletteInfo?: ColorPaletteInfo[];
  disablePrevious?: boolean;
  disableNext?: boolean;
}

const NavigationHeader: React.FC<NavigationHeaderProps> = ({
  title,
  onPrevious,
  onNext,
  viewMode,
  onViewModeChange,
  showViewToggle = true,
  calendarTitle,
  colorPaletteInfo,
  disablePrevious = false,
  disableNext = false,
}) => {
  return (
    <>
      <div
        className={clsx("flex items-center justify-between mb-4", {
          "justify-end": !calendarTitle,
        })}
      >
        {calendarTitle && (
          <div className="text-m font-medium text-rspl-neutral-800 dark:text-rspl-neutral-100">
            {calendarTitle}
          </div>
        )}
        {showViewToggle && onViewModeChange && (
          <ViewToggle viewMode={viewMode} onViewModeChange={onViewModeChange} />
        )}
      </div>

      <div
        className={clsx("flex items-center justify-between mb-4", {
          "justify-end": !colorPaletteInfo,
        })}
      >
        {colorPaletteInfo && (
          <div className="color-palette flex gap-4">
            {colorPaletteInfo.map((colorInfo) => (
              <div
                key={`color-palette-${colorInfo.label}`}
                className="color-palette-item flex items-center gap-1"
              >
                <div
                  className={clsx(
                    "color-box w-4 h-4 border border-container-border",
                    getColorBoxClass(colorInfo.color),
                  )}
                />
                <span className="color-label text-rspl-neutral-500 dark:text-rspl-neutral-400 text-xs">
                  {colorInfo.label}
                </span>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-center gap-3 pr-1">
          <Button
            variant="outline"
            size="iconMd"
            onClick={onPrevious}
            disabled={disablePrevious}
            className={clsx(
              "p-2 rounded-lg transition-colors",
              disablePrevious
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-rspl-neutral-100 dark:hover:bg-rspl-neutral-700 cursor-pointer",
            )}
            aria-label="Previous period"
          >
            <ChevronLeft className="w-5 h-5 text-rspl-neutral-600 dark:text-rspl-neutral-300" />
          </Button>
          <span className="text-xs font-medium text-black dark:text-rspl-neutral-100 px-2">
            {title}
          </span>
          <Button
            variant="outline"
            size="iconMd"
            onClick={onNext}
            disabled={disableNext}
            className={clsx(
              "p-2 rounded-lg transition-colors",
              disableNext
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-rspl-neutral-100 dark:hover:bg-rspl-neutral-700 cursor-pointer",
            )}
            aria-label="Next period"
          >
            <ChevronRight className="w-5 h-5 text-rspl-neutral-600 dark:text-rspl-neutral-300" />
          </Button>
        </div>
      </div>
    </>
  );
};

// Helper function to check if a date is within minDate and maxDate bounds
const isDateInBounds = (
  date: Date,
  minDate?: Date,
  maxDate?: Date,
): boolean => {
  if (minDate && date < minDate) return false;
  if (maxDate && date > maxDate) return false;
  return true;
};

// Monthly View
interface MonthlyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate?: Date;
  onCellClick?: (date: Date, event?: CalendarEvent) => void;
  weekStartsOn: number;
  children?: React.ReactNode;
  highlightSelectedDate?: boolean;
  highlightCurrentDate?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const MonthlyView: React.FC<MonthlyViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onCellClick,
  weekStartsOn,
  children,
  highlightSelectedDate = false,
  highlightCurrentDate = false,
  minDate,
  maxDate,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  // Generate day headers
  const dayHeaders = useMemo(() => {
    const headers = [];
    for (let i = 0; i < 7; i++) {
      const dayIndex = (weekStartsOn + i) % 7;
      headers.push(DAY_NAMES_SHORT[dayIndex]);
    }
    return headers;
  }, [weekStartsOn]);

  // Generate calendar grid
  const calendarDays = useMemo(() => {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    const daysInPrevMonth = getDaysInMonth(year, month - 1);

    // Calculate offset based on weekStartsOn
    const startOffset = (firstDayOfMonth - weekStartsOn + 7) % 7;

    const days: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month days
    for (let i = startOffset - 1; i >= 0; i--) {
      const date = new Date(year, month - 1, daysInPrevMonth - i);
      days.push({ date, isCurrentMonth: false });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }

    // Next month days to complete the grid
    const remainingDays = 42 - days.length; // 6 rows * 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, month + 1, i);
      days.push({ date, isCurrentMonth: false });
    }

    return days;
  }, [year, month, weekStartsOn]);

  const getEventForDate = useCallback(
    (date: Date): CalendarEvent | undefined => {
      return events.find((event) => isSameDay(event.date, date));
    },
    [events],
  );

  return (
    <div className="flex-1 flex flex-col border border-rspl-neutral-200 dark:border-rspl-neutral-700 rounded-lg overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-rspl-neutral-50 dark:bg-rspl-neutral-800 border-b border-rspl-neutral-200 dark:border-rspl-neutral-700">
        {dayHeaders.map((day) => (
          <div
            key={day}
            className="py-3 px-2 text-center text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300 border-r last:border-r-0 border-rspl-neutral-200 dark:border-rspl-neutral-700"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 flex-1 overflow-auto scrollbar-hide">
        {calendarDays.map((item) => {
          const event = getEventForDate(item.date);
          const dateOnly = new Date(
            item.date.getFullYear(),
            item.date.getMonth(),
            item.date.getDate(),
          );
          const disabled = !isDateInBounds(dateOnly, minDate, maxDate);
          return (
            <CalendarCell
              key={item.date.toISOString()}
              date={item.date}
              event={event}
              isCurrentMonth={item.isCurrentMonth}
              isSelected={
                selectedDate ? isSameDay(item.date, selectedDate) : false
              }
              isToday={isSameDay(item.date, today)}
              highlightSelected={highlightSelectedDate}
              highlightToday={highlightCurrentDate}
              onClick={() => onCellClick?.(item.date, event)}
              children={children}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};

// Weekly View with Detail Column support
interface WeeklyViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  selectedDate?: Date;
  onCellClick?: (date: Date, event?: CalendarEvent) => void;
  weekStartsOn: number;
  children?: React.ReactNode;
  // Detail column props
  showDetailColumn?: boolean;
  detailColumnConfig?: DetailColumnConfig;
  rows?: RowData[];
  gridData?: GridCellData[];
  onGridCellClick?: (
    rowId: string,
    date: Date,
    cellData?: GridCellData,
  ) => void;
  highlightSelectedDate?: boolean;
  highlightCurrentDate?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const WeeklyView: React.FC<WeeklyViewProps> = ({
  currentDate,
  events,
  selectedDate,
  onCellClick,
  weekStartsOn,
  children,
  showDetailColumn = false,
  detailColumnConfig,
  rows = [],
  gridData = [],
  onGridCellClick,
  highlightSelectedDate = false,
  highlightCurrentDate = false,
  minDate,
  maxDate,
}) => {
  const today = new Date();
  const startOfWeek = getStartOfWeek(currentDate, weekStartsOn);

  const weekDays = useMemo(() => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  }, [startOfWeek.getTime()]);

  const getEventForDate = useCallback(
    (date: Date): CalendarEvent | undefined => {
      return events.find((event) => isSameDay(event.date, date));
    },
    [events],
  );

  const getCellData = useCallback(
    (rowId: string, date: Date): GridCellData | undefined => {
      return gridData.find(
        (cell) =>
          cell.rowId === rowId && cell.date && isSameDay(cell.date, date),
      );
    },
    [gridData],
  );

  const detailWidth = detailColumnConfig?.width || "80px";

  // If we have rows and detail column, render multi-row grid
  if (showDetailColumn && rows.length > 0) {
    return (
      <div className="flex-1 flex flex-col border border-rspl-neutral-200 dark:border-rspl-neutral-700 rounded-lg overflow-hidden">
        {/* Header row */}
        <div
          className="grid bg-rspl-neutral-50 dark:bg-rspl-neutral-800 border-b border-rspl-neutral-200 dark:border-rspl-neutral-700"
          style={{
            gridTemplateColumns: `${detailWidth} repeat(7, 1fr)`,
          }}
        >
          {/* Detail column header */}
          <div
            className={clsx(
              "py-3 px-2 text-center text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300 border-r border-rspl-neutral-200 dark:border-rspl-neutral-700",
              detailColumnConfig?.className,
            )}
          >
            {detailColumnConfig?.header || ""}
          </div>
          {/* Day headers */}
          {weekDays.map((date) => {
            const dayName = DAY_NAMES_SHORT[date.getDay()];
            const dayNumber = date.getDate();
            return (
              <div
                key={date.toISOString()}
                className="py-3 px-2 text-center border-r last:border-r-0 border-rspl-neutral-200 dark:border-rspl-neutral-700"
              >
                <div className="text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300">
                  {dayName}
                </div>
                <div className="text-lg font-semibold text-rspl-neutral-900 dark:text-rspl-neutral-100">
                  {dayNumber}
                </div>
              </div>
            );
          })}
        </div>

        {/* Data rows */}
        <div className=" flex-1 overflow-auto scrollbar-hide">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid"
              style={{
                gridTemplateColumns: `${detailWidth} repeat(7, 1fr)`,
              }}
            >
              {/* Row label cell */}
              <RowLabelCell
                row={row}
                className={detailColumnConfig?.className}
              />
              {/* Day cells for this row */}
              {weekDays.map((date) => {
                const cellData = getCellData(row.id, date);
                const dateOnly = new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate(),
                );
                const disabled = !isDateInBounds(dateOnly, minDate, maxDate);
                return (
                  <GridCell
                    key={`${row.id}-${date.toISOString()}`}
                    cellData={cellData}
                    isSelected={
                      selectedDate ? isSameDay(date, selectedDate) : false
                    }
                    highlightSelected={highlightSelectedDate}
                    onClick={() => onGridCellClick?.(row.id, date, cellData)}
                    disabled={disabled}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default single-row weekly view
  return (
    <div className="flex-1 flex flex-col border border-rspl-neutral-200 dark:border-rspl-neutral-700 rounded-lg overflow-hidden">
      {/* Day headers */}
      <div className="grid grid-cols-7 bg-rspl-neutral-50 dark:bg-rspl-neutral-800 border-b border-rspl-neutral-200 dark:border-rspl-neutral-700">
        {weekDays.map((date) => {
          const dayName = DAY_NAMES_SHORT[date.getDay()];
          const dayNumber = date.getDate();
          return (
            <div
              key={date.toISOString()}
              className="py-3 px-2 text-center text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300 border-r last:border-r-0 border-rspl-neutral-200 dark:border-rspl-neutral-700"
            >
              {dayName} {dayNumber}
            </div>
          );
        })}
      </div>

      {/* Week cells */}
      <div className="grid grid-cols-7 flex-1 overflow-auto scrollbar-hide">
        {weekDays.map((date) => {
          const event = getEventForDate(date);
          const dateOnly = new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate(),
          );
          const disabled = !isDateInBounds(dateOnly, minDate, maxDate);
          return (
            <CalendarCell
              key={date.toISOString()}
              date={date}
              event={event}
              isCurrentMonth={true}
              isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
              isToday={isSameDay(date, today)}
              highlightSelected={highlightSelectedDate}
              highlightToday={highlightCurrentDate}
              onClick={() => onCellClick?.(date, event)}
              children={children}
              disabled={disabled}
            />
          );
        })}
      </div>
    </div>
  );
};

// Daily View with Detail Column support
interface DailyViewProps {
  currentDate: Date;
  hourlyEvents: HourlyEvent[];
  selectedHour?: number;
  onCellClick?: (date: Date, event?: HourlyEvent) => void;
  // Detail column props
  showDetailColumn?: boolean;
  detailColumnConfig?: DetailColumnConfig;
  rows?: RowData[];
  gridData?: GridCellData[];
  onGridCellClick?: (
    rowId: string,
    hour: number,
    cellData?: GridCellData,
  ) => void;
  highlightSelectedDate?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

const DailyView: React.FC<DailyViewProps> = ({
  currentDate,
  hourlyEvents,
  selectedHour,
  onCellClick,
  showDetailColumn = false,
  detailColumnConfig,
  rows = [],
  gridData = [],
  onGridCellClick,
  highlightSelectedDate = false,
  minDate,
  maxDate,
}) => {
  const hours = useMemo(() => {
    return Array.from({ length: 24 }, (_, i) => i);
  }, []);

  const getEventForHour = useCallback(
    (hour: number): HourlyEvent | undefined => {
      return hourlyEvents.find((event) => event.hour === hour);
    },
    [hourlyEvents],
  );

  const getCellData = useCallback(
    (rowId: string, hour: number): GridCellData | undefined => {
      return gridData.find(
        (cell) => cell.rowId === rowId && cell.hour === hour,
      );
    },
    [gridData],
  );

  const detailWidth = detailColumnConfig?.width || "80px";

  // If we have rows and detail column, render multi-row grid
  if (showDetailColumn && rows.length > 0) {
    return (
      <div className="flex-1 border border-rspl-neutral-200 dark:border-rspl-neutral-700 rounded-lg overflow-hidden">
        <div className="h-full w-full overflow-auto scrollbar-thin">
          {/* Header row */}
          <div className="flex bg-rspl-neutral-50 dark:bg-rspl-neutral-800 border-b border-rspl-neutral-200 dark:border-rspl-neutral-700 min-w-max">
            {/* Detail column header */}
            <div
              className={clsx(
                "py-3 px-2 text-center text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300 border-r border-rspl-neutral-200 dark:border-rspl-neutral-700 shrink-0",
                detailColumnConfig?.className,
              )}
              style={{ width: detailWidth, minWidth: detailWidth }}
            >
              {detailColumnConfig?.header || ""}
            </div>
            {/* Hour headers */}
            {hours.map((hour) => (
              <div
                key={hour}
                className="w-[80px] shrink-0 py-3 px-2 text-center text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300 border-r last:border-r-0 border-rspl-neutral-200 dark:border-rspl-neutral-700"
              >
                {String(hour).padStart(2, "0")}:00
              </div>
            ))}
          </div>

          {/* Data rows */}
          {rows.map((row) => (
            <div key={row.id} className="flex min-w-max">
              {/* Row label cell */}
              <div
                className={clsx("shrink-0", detailColumnConfig?.className)}
                style={{ width: detailWidth, minWidth: detailWidth }}
              >
                <RowLabelCell row={row} />
              </div>
              {/* Hour cells for this row */}
              {hours.map((hour) => {
                const cellData = getCellData(row.id, hour);
                const dateOnly = new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth(),
                  currentDate.getDate(),
                );
                const disabled = !isDateInBounds(dateOnly, minDate, maxDate);
                return (
                  <div key={hour} className="w-[80px] shrink-0 h-[48px]">
                    <GridCell
                      cellData={cellData}
                      isSelected={selectedHour === hour}
                      highlightSelected={highlightSelectedDate}
                      onClick={() => onGridCellClick?.(row.id, hour, cellData)}
                      disabled={disabled}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default single-row daily view
  return (
    <div className="flex-1 flex flex-col border border-rspl-neutral-200 dark:border-rspl-neutral-700 rounded-lg overflow-hidden">
      <div className="h-full w-full overflow-auto scrollbar-thin">
        {/* Hour headers */}
        <div className="flex bg-rspl-neutral-50 dark:bg-rspl-neutral-800 border-b border-rspl-neutral-200 dark:border-rspl-neutral-700 min-w-max">
          {hours.map((hour) => (
            <div
              key={hour}
              className="w-[100px] shrink-0 py-3 px-2 text-center text-sm font-medium text-rspl-neutral-600 dark:text-rspl-neutral-300 border-r last:border-r-0 border-rspl-neutral-200 dark:border-rspl-neutral-700"
            >
              {String(hour).padStart(2, "0")}:00
            </div>
          ))}
        </div>

        {/* Hourly cells */}
        <div className="flex min-w-max">
          {hours.map((hour) => {
            const event = getEventForHour(hour);
            const dateWithHour = new Date(currentDate);
            dateWithHour.setHours(hour, 0, 0, 0);
            const dateOnly = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate(),
            );
            const disabled = !isDateInBounds(dateOnly, minDate, maxDate);
            return (
              <div key={hour} className="w-[100px] shrink-0">
                <HourlyCell
                  hour={hour}
                  event={event}
                  isSelected={selectedHour === hour}
                  highlightSelected={highlightSelectedDate}
                  onClick={() => onCellClick?.(dateWithHour, event)}
                  disabled={disabled}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

function getViewStartDate(
  date: Date,
  viewMode: CalendarViewMode,
  weekStartsOn: number,
): Date {
  const startDate = new Date(date);
  switch (viewMode) {
    case "monthly": {
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      return startDate;
    }
    case "weekly": {
      const startOfWeek = getStartOfWeek(startDate, weekStartsOn);
      startOfWeek.setHours(0, 0, 0, 0);
      return startOfWeek;
    }
    case "daily": {
      startDate.setHours(0, 0, 0, 0);
      return startDate;
    }
  }
}

// Main CalendarView Component
export const CalendarView: React.FC<CalendarViewProps> = ({
  viewMode: controlledViewMode,
  onViewModeChange,
  events = [],
  hourlyEvents = [],
  selectedDate: controlledSelectedDate,
  onDateChange,
  onCellClick,
  className,
  showViewToggle = true,
  weekStartsOn = 1, // Default to Monday
  showDetailColumn = false,
  detailColumnConfig,
  rows = [],
  gridData = [],
  onGridCellClick,
  calendarTitle,
  colorPaletteInfo,
  highlightSelectedDate = false,
  highlightCurrentDate = false,
  minDate,
  maxDate,
}) => {
  // Internal state for uncontrolled mode
  const [internalViewMode, setInternalViewMode] =
    useState<CalendarViewMode>("monthly");
  const [internalCurrentDate, setInternalCurrentDate] = useState(new Date());

  // Use controlled or internal state
  const viewMode = controlledViewMode ?? internalViewMode;
  const currentDate = controlledSelectedDate ?? internalCurrentDate;

  const handleViewModeChange = (mode: CalendarViewMode) => {
    if (onViewModeChange) {
      onViewModeChange(mode);
    } else {
      setInternalViewMode(mode);
    }
  };

  const handleDateChange = useCallback(
    (date: Date) => {
      // Clamp date to minDate/maxDate if provided
      let clampedDate = date;
      if (minDate && clampedDate < minDate) {
        clampedDate = new Date(minDate);
      }
      if (maxDate && clampedDate > maxDate) {
        clampedDate = new Date(maxDate);
      }

      if (onDateChange) {
        onDateChange(clampedDate);
      } else {
        setInternalCurrentDate(clampedDate);
      }
    },
    [minDate, maxDate, onDateChange],
  );

  const canNavigatePrevious = useMemo(() => {
    if (!minDate) return true;
    const viewStart = getViewStartDate(currentDate, viewMode, weekStartsOn);
    const previousDate = new Date(viewStart);
    switch (viewMode) {
      case "monthly":
        previousDate.setMonth(previousDate.getMonth() - 1);
        break;
      case "weekly":
        previousDate.setDate(previousDate.getDate() - 7);
        break;
      case "daily":
        previousDate.setDate(previousDate.getDate() - 1);
        break;
    }
    return previousDate >= minDate;
  }, [currentDate, viewMode, minDate, weekStartsOn]);

  const canNavigateNext = useMemo(() => {
    if (!maxDate) return true;
    const nextDate = new Date(currentDate);
    switch (viewMode) {
      case "monthly": {
        nextDate.setMonth(nextDate.getMonth() + 1);
        const nextViewStart = getViewStartDate(
          nextDate,
          viewMode,
          weekStartsOn,
        );
        return nextViewStart <= maxDate;
      }
      case "weekly": {
        nextDate.setDate(nextDate.getDate() + 7);
        const nextViewStart = getViewStartDate(
          nextDate,
          viewMode,
          weekStartsOn,
        );
        return nextViewStart <= maxDate;
      }
      case "daily": {
        nextDate.setDate(nextDate.getDate() + 1);
        const nextViewStart = getViewStartDate(
          nextDate,
          viewMode,
          weekStartsOn,
        );
        return nextViewStart <= maxDate;
      }
    }
  }, [currentDate, viewMode, maxDate, weekStartsOn]);

  const handlePrevious = useCallback(() => {
    if (!canNavigatePrevious) return;
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case "monthly":
        newDate.setMonth(newDate.getMonth() - 1);
        break;
      case "weekly":
        newDate.setDate(newDate.getDate() - 7);
        break;
      case "daily":
        newDate.setDate(newDate.getDate() - 1);
        break;
    }
    handleDateChange(newDate);
  }, [canNavigatePrevious, currentDate, viewMode, handleDateChange]);

  const handleNext = useCallback(() => {
    if (!canNavigateNext) return;
    const newDate = new Date(currentDate);
    switch (viewMode) {
      case "monthly":
        newDate.setMonth(newDate.getMonth() + 1);
        break;
      case "weekly":
        newDate.setDate(newDate.getDate() + 7);
        break;
      case "daily":
        newDate.setDate(newDate.getDate() + 1);
        break;
    }
    handleDateChange(newDate);
  }, [canNavigateNext, currentDate, viewMode, handleDateChange]);

  const title = useMemo(() => {
    switch (viewMode) {
      case "monthly":
        return formatMonthYear(currentDate);
      case "weekly":
        return formatWeekRange(currentDate, weekStartsOn);
      case "daily": {
        const day = currentDate.getDate().toString().padStart(2, "0");
        const month = currentDate.toLocaleDateString("en-US", {
          month: "short",
        });
        const year = currentDate.getFullYear();
        const weekday = currentDate.toLocaleDateString("en-US", {
          weekday: "long",
        });
        return `${day} ${month} ${year} (${weekday})`;
      }
    }
  }, [viewMode, currentDate, weekStartsOn]);

  return (
    <div className={className} role="region" aria-label="Calendar">
      <NavigationHeader
        title={title}
        onPrevious={handlePrevious}
        onNext={handleNext}
        viewMode={viewMode}
        onViewModeChange={handleViewModeChange}
        showViewToggle={showViewToggle}
        calendarTitle={calendarTitle}
        colorPaletteInfo={colorPaletteInfo}
        disablePrevious={!canNavigatePrevious}
        disableNext={!canNavigateNext}
      />

      {viewMode === "monthly" && (
        <MonthlyView
          currentDate={currentDate}
          events={events}
          selectedDate={controlledSelectedDate}
          onCellClick={onCellClick}
          weekStartsOn={weekStartsOn}
          highlightSelectedDate={highlightSelectedDate}
          highlightCurrentDate={highlightCurrentDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}

      {viewMode === "weekly" && (
        <WeeklyView
          currentDate={currentDate}
          events={events}
          selectedDate={controlledSelectedDate}
          onCellClick={onCellClick}
          weekStartsOn={weekStartsOn}
          showDetailColumn={showDetailColumn}
          detailColumnConfig={detailColumnConfig}
          rows={rows}
          gridData={gridData}
          onGridCellClick={(rowId, date, cellData) =>
            onGridCellClick?.(rowId, date, undefined, cellData)
          }
          highlightSelectedDate={highlightSelectedDate}
          highlightCurrentDate={highlightCurrentDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}

      {viewMode === "daily" && (
        <DailyView
          currentDate={currentDate}
          hourlyEvents={hourlyEvents}
          selectedHour={currentDate.getHours()}
          onCellClick={onCellClick}
          showDetailColumn={showDetailColumn}
          detailColumnConfig={detailColumnConfig}
          rows={rows}
          gridData={gridData}
          onGridCellClick={(rowId, hour, cellData) =>
            onGridCellClick?.(rowId, undefined, hour, cellData)
          }
          highlightSelectedDate={highlightSelectedDate}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    </div>
  );
};

// Export sub-components for flexibility
export { CalendarCell, HourlyCell, ViewToggle, GridCell, RowLabelCell };

export default CalendarView;
