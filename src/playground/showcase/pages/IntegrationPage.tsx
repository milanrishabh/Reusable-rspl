import { DemoSection } from "../DemoSection";

export function IntegrationPage(): React.ReactElement {
  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <header>
        <h1 className="text-2xl font-semibold text-rspl-neutral-900 dark:text-white">
          Integrate the library in your app
        </h1>
        <p className="mt-2 text-sm text-rspl-neutral-600 dark:text-rspl-neutral-400">
          Wrap your root with the same providers and global styles this demo uses.
          Export paths assume the package is linked or copied; adjust imports to your
          monorepo alias (for example{" "}
          <code className="rounded bg-rspl-neutral-100 px-1 dark:bg-rspl-neutral-800">
            @components/ui/Button
          </code>
          ).
        </p>
      </header>

      <DemoSection
        id="root-bootstrap"
        title="1. Root entry (main.tsx)"
        description="Mount React, wrap with ErrorBoundary, and include ToastContainer so FileUpload and useAnnounce can show toasts."
        props={[
          {
            name: "ErrorBoundary",
            description:
              "Catches render errors; optional fallback and onError callback.",
          },
          {
            name: "ToastContainer",
            description:
              "From react-toastify; place once at the root next to your app shell.",
          },
        ]}
      >
        <pre className="overflow-x-auto rounded-md bg-rspl-neutral-900 p-4 text-xs text-rspl-neutral-100">
{`import { ToastContainer } from "react-toastify";
import { ErrorBoundary } from "./components/ErrorBoundary";
import "./styles/tailwind.css";
import "./styles/notification.css";
import "./styles/global.sass";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
      <ToastContainer position="top-right" theme="light" />
    </ErrorBoundary>
  </StrictMode>,
);`}
        </pre>
      </DemoSection>

      <DemoSection
        id="routing-shell"
        title="2. App shell pattern (this demo)"
        description="Use PageHeader for titles, a fixed aside for NavLink-based navigation, and an Outlet (or your layout) for page content. react-router-dom is a normal app dependency—not bundled in the UI package."
        props={[
          {
            name: "PageHeader",
            description:
              "title, optional description, actions, leftAction, logo, onSidebarToggle + sidebarCollapsed, showUserMenu (default account dropdown using Dropdown primitives).",
          },
          {
            name: "NavLink",
            description:
              "Active route styling; pair with Routes/Route for SPA navigation.",
          },
        ]}
      >
        <pre className="overflow-x-auto rounded-md bg-rspl-neutral-900 p-4 text-xs text-rspl-neutral-100">
{`<PageHeader
  title="My App"
  description="..."
  logo={<YourMark />}
  onSidebarToggle={() => setOpen((v) => !v)}
  sidebarCollapsed={!open}
  actions={<Button>Save</Button>}
/>
<aside>
  <NavLink to="/dashboard">Dashboard</NavLink>
</aside>
<main><Outlet /></main>`}
        </pre>
      </DemoSection>

      <DemoSection
        id="barrel-imports"
        title="3. Importing components"
        description="Prefer the package barrel (src/index.ts) for public API. Advanced calendar building blocks are exported for custom layouts."
        props={[
          {
            name: "Barrel",
            description:
              "import { Button, Modal, Table } from \"@/index\" or your package name.",
          },
          {
            name: "CalendarView submodules",
            description:
              "CalendarCell, HourlyCell, GridCell, RowLabelCell, ViewToggle — use when composing custom grids.",
          },
        ]}
      >
        <pre className="overflow-x-auto rounded-md bg-rspl-neutral-900 p-4 text-xs text-rspl-neutral-100">
{`import { Button, Modal, useAnnounce } from "./index";
import { AgGridTable } from "./index";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";`}
        </pre>
      </DemoSection>

      <DemoSection
        id="tokens"
        title="4. Design tokens (Tailwind v4)"
        description="Theme colors live in src/styles/tailwind.css under @theme (rspl-* scales). ag-grid-overrides.css aligns the grid with the same tokens."
      >
        <p className="text-sm text-rspl-neutral-600 dark:text-rspl-neutral-400">
          Extend or override CSS variables such as{" "}
          <code className="rounded bg-rspl-neutral-100 px-1 dark:bg-rspl-neutral-800">
            --color-rspl-primary-500
          </code>{" "}
          to brand the library for your product.
        </p>
      </DemoSection>
    </div>
  );
}
