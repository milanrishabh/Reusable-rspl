import { PageHeader } from "@components/PageHeader";
import { cn } from "@lib/utils/cn";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

const navItems: { to: string; label: string }[] = [
  { to: "/", label: "Integration" },
  { to: "/showcase/feedback", label: "Feedback & status" },
  { to: "/showcase/forms", label: "Forms & inputs" },
  { to: "/showcase/pickers", label: "Pickers & dropdowns" },
  { to: "/showcase/data", label: "Data display" },
  { to: "/showcase/overlays", label: "Overlays" },
  { to: "/showcase/navigation", label: "Navigation" },
  { to: "/showcase/media", label: "Media & calendar" },
  { to: "/showcase/notifications", label: "Notifications" },
];

function linkClassName(isActive: boolean): string {
  return [
    "block rounded-md px-3 py-2 text-sm transition-colors",
    isActive
      ? "bg-rspl-primary-50 font-medium text-rspl-primary-800 dark:bg-rspl-primary-900/30 dark:text-rspl-primary-200"
      : "text-rspl-neutral-700 hover:bg-rspl-neutral-50 dark:text-rspl-neutral-300 dark:hover:bg-rspl-neutral-800",
  ].join(" ");
}

export function ShowcaseLayout(): React.ReactElement {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-rspl-neutral-50 dark:bg-rspl-neutral-950">
      <div className="shrink-0">
        <PageHeader
          title="RSPL reusable UI"
          description="Interactive examples for every exported component. Use the sidebar to navigate sections."
          sidebarCollapsed={sidebarCollapsed}
          onSidebarToggle={() => setSidebarCollapsed((c) => !c)}
          actions={
            <span className="text-xs text-rspl-neutral-500">
              Import from{" "}
              <code className="rounded bg-rspl-neutral-100 px-1.5 py-0.5 dark:bg-rspl-neutral-800">
                src/index.ts
              </code>
            </span>
          }
        />
      </div>
      <nav
        className="flex shrink-0 flex-wrap gap-1 border-b border-rspl-neutral-200 bg-white px-3 py-2 md:hidden dark:border-rspl-neutral-800 dark:bg-rspl-neutral-900"
        aria-label="Showcase navigation (compact)"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              isActive
                ? "rounded-md bg-rspl-primary-50 px-2 py-1 text-xs font-medium text-rspl-primary-800 dark:bg-rspl-primary-900/30"
                : "rounded-md px-2 py-1 text-xs text-rspl-neutral-600 dark:text-rspl-neutral-400"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside
          id="showcase-sidebar-nav"
          inert={sidebarCollapsed}
          className={cn(
            "hidden shrink-0 overflow-y-auto overflow-x-hidden border-r border-rspl-neutral-200 bg-white transition-[width,min-width,padding] duration-200 ease-out dark:border-rspl-neutral-800 dark:bg-rspl-neutral-900 md:block",
            sidebarCollapsed
              ? "w-0 min-w-0 border-transparent p-0 md:w-0 md:min-w-0 md:p-0"
              : "w-56 min-w-56 px-3 py-4",
          )}
          aria-label="Showcase navigation"
        >
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) => linkClassName(isActive)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
