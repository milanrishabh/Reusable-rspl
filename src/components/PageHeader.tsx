import { Button } from "@components/ui/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "@components/ui/Dropdown";
import { cn } from "@lib/utils/cn";
import { LogOut, PanelLeftClose, PanelRightOpen, Settings, User } from "lucide-react";
import React from "react";

export interface PageHeaderProps {
  title: string;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  /** Extra slot in the title column (e.g. breadcrumbs). */
  leftAction?: React.ReactNode;
  /** Brand mark; defaults to a compact RSPL mark. Shown first in the sidebar rail when a toggle is present. */
  logo?: React.ReactNode;
  /** When set, shows collapse/expand beside the logo inside a rail that matches sidebar width. */
  onSidebarToggle?: () => void;
  /** Drives the toggle icon/labels when `onSidebarToggle` is used. */
  sidebarCollapsed?: boolean;
  /** Renders the account menu (Dropdown primitives). Default true. */
  showUserMenu?: boolean;
  className?: string;
}

function RsplLogoMark(): React.ReactElement {
  return (
    <span
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-rspl-primary-600 text-xs font-bold text-white shadow-sm"
      aria-hidden
    >
      RS
    </span>
  );
}

function PageHeaderUserMenu(): React.ReactElement {
  return (
    <Dropdown name="page-header-user-menu">
      <DropdownTrigger
        className={cn(
          "!h-9 !min-h-9 !w-auto !min-w-0 !border-0 !bg-transparent !px-1 !shadow-none",
          "hover:!bg-rspl-neutral-100 dark:hover:!bg-rspl-neutral-800",
          "[&>div:last-child]:hidden",
        )}
      >
        <span className="sr-only">Account menu</span>
        <span
          className="flex h-8 w-8 items-center justify-center rounded-full bg-rspl-primary-100 text-xs font-semibold text-rspl-primary-800 ring-2 ring-rspl-primary-200 dark:bg-rspl-primary-900/40 dark:text-rspl-primary-200 dark:ring-rspl-primary-700"
          aria-hidden
        >
          JD
        </span>
      </DropdownTrigger>
      <DropdownContent align="right" minWidth="12rem" maxHeight="320px">
        <div className="w-full px-2 py-2">
          <p className="text-sm font-medium text-rspl-neutral-900 dark:text-rspl-neutral-100">
            Jamie Doe
          </p>
          <p className="text-xs text-rspl-neutral-500 dark:text-rspl-neutral-400">
            demo@rspl.example
          </p>
        </div>
        <DropdownSeparator />
        <DropdownItem onClick={() => {}}>
          <User className="h-4 w-4 shrink-0" aria-hidden />
          My profile
        </DropdownItem>
        <DropdownItem onClick={() => {}}>
          <Settings className="h-4 w-4 shrink-0" aria-hidden />
          Settings
        </DropdownItem>
        <DropdownSeparator />
        <DropdownItem
          onClick={() => {}}
          className="text-rspl-error-600 hover:bg-rspl-error-50 dark:text-rspl-error-400 dark:hover:bg-rspl-error-950/40"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden />
          Log out
        </DropdownItem>
      </DropdownContent>
    </Dropdown>
  );
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  leftAction,
  actions,
  logo,
  onSidebarToggle,
  sidebarCollapsed = false,
  showUserMenu = true,
  className,
}) => {
  const headerId = `page-header-${title.toLowerCase().replace(/\s+/g, "-")}`;
  const hasSidebarToggle = onSidebarToggle != null;

  const logoNode = logo ?? <RsplLogoMark />;

  return (
    <header
      id={headerId}
      className={cn(
        "border-b border-neutral-200 bg-white outline outline-offset-[-0.5px] outline-neutral-200 dark:border-rspl-neutral-800 dark:bg-rspl-neutral-900 dark:outline-rspl-neutral-800",
        className,
      )}
    >
      <div className="flex w-full min-w-0 items-stretch">
        {hasSidebarToggle ? (
          <div
            className={cn(
              "flex shrink-0 items-center gap-2 border-rspl-neutral-200 py-2.5 transition-[width,min-width,max-width,padding] duration-200 ease-out dark:border-rspl-neutral-800",
              "max-md:border-r-0 md:border-r",
              sidebarCollapsed
                ? "min-w-0 max-w-none justify-start gap-2 px-3"
                : cn(
                    "justify-between px-3",
                    "md:w-56 md:min-w-[14rem] md:max-w-[14rem]",
                  ),
            )}
          >
            <div className="shrink-0">{logoNode}</div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="shrink-0"
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              aria-expanded={!sidebarCollapsed}
              aria-controls="showcase-sidebar-nav"
              onClick={onSidebarToggle}
            >
              {sidebarCollapsed ? (
                <PanelRightOpen className="h-5 w-5" aria-hidden />
              ) : (
                <PanelLeftClose className="h-5 w-5" aria-hidden />
              )}
            </Button>
          </div>
        ) : (
          <div className="flex shrink-0 items-center gap-2 border-r border-transparent px-4 py-2.5">
            {logoNode}
            {leftAction ? <div className="shrink-0">{leftAction}</div> : null}
          </div>
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-4 py-2.5 md:px-8">
          {hasSidebarToggle && leftAction ? (
            <div className="shrink-0">{leftAction}</div>
          ) : null}
          <div
            id={`${headerId}-title`}
            className="text-xl font-semibold leading-snug text-rspl-neutral-900 dark:text-rspl-neutral-100"
          >
            {title}
          </div>
          {description != null ? (
            <div
              id={`${headerId}-description`}
              className="text-sm font-normal leading-snug text-neutral-500 dark:text-rspl-neutral-400"
            >
              {description}
            </div>
          ) : null}
        </div>

        <div
          id={`${headerId}-actions`}
          className="flex shrink-0 flex-wrap items-center justify-end gap-3 px-4 py-2.5 md:pr-8"
        >
          {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
          {showUserMenu ? <PageHeaderUserMenu /> : null}
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
