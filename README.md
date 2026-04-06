# @rspl/reusable-ui

Shared React UI primitives for Moving Walls products: form controls, data display, overlays, navigation helpers, and utilities. Built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**.

## Overview

This package exposes a stable public API from `src/index.ts` (barrel). Consumer apps import components, hooks, and helpers from the package entry (`"."` in `package.json` `exports`) or, in a monorepo, via path aliases to `src`.

The repository ships a **local showcase** (`src/playground/showcase`) that documents integration and demonstrates components grouped by category (forms, pickers, data, overlays, navigation, media, notifications, feedback).

## Using the reusable components

### 1. Dependencies

- **Peer dependencies**: `react` and `react-dom` **^19** (see `package.json`).
- **App-level setup** used by the showcase and recommended for consumers that rely on toasts or upload flows:
  - Wrap the tree with **`ErrorBoundary`** (exported from the package).
  - Mount **`ToastContainer`** from `react-toastify` once at the root (e.g. next to your app shell) so patterns like **FileUpload** and **useAnnounce** can show notifications.

### 2. Styles and theming

- Import the same global layers the demo uses: Tailwind entry (`src/styles/tailwind.css`), toast/notification styles, and any shared SASS/globals your app needs.
- Design tokens live under **`@theme`** in `src/styles/tailwind.css` (e.g. `rspl-*` color scales). Override CSS variables there to align the library with your product branding.

### 3. Imports

- Prefer **barrel imports** from the package root so you stay on the public API:

  ```ts
  import { Button, Modal, Table, PageHeader, useAnnounce } from "@rspl/reusable-ui";
  ```

  When developing inside this repo or with a monorepo alias, paths such as `@components/ui/Button` or `./index` resolve the same symbols—adjust to your bundler/tsconfig `paths`.

- **AgGridTable**: if you use the grid, import AG Grid’s CSS themes in the app (e.g. `ag-grid-community/styles/ag-grid.css` and a theme such as `ag-theme-quartz.css`) as shown on the Integration page in the showcase.

- **CalendarView**: full **`CalendarView`** is exported; lower-level pieces (**`CalendarCell`**, **`HourlyCell`**, **`GridCell`**, **`RowLabelCell`**, **`ViewToggle`**) are available for custom layouts.

### 4. Shell and routing

- **`PageHeader`** supports title, description, actions, optional logo, sidebar toggle props, and optional user menu wiring.
- **Routing** (`react-router-dom`, `NavLink`, `Outlet`, etc.) is an **application concern**—it is not bundled as part of the UI package; the showcase is only an example layout.

### 5. Utilities and hooks

The barrel also exports helpers such as **`cn`**, date utilities, table sorting types/helpers, and hooks including **`useAnnounce`**, **`useClickOutside`**, and **`useDropdownPortal`** / **`useDropdownPortalSimple`**. See `src/index.ts` for the full list.

## Local development

| Command | Purpose |
| --- | --- |
| `yarn dev` | Vite dev server (default port **4700**) |
| `yarn build` | `tsc -b` and production build |
| `yarn preview` | Preview production build (port **4700**) |
| `yarn test` | Vitest |
| `yarn test:coverage` | Coverage report |
| `yarn lint` | ESLint |

Open the dev server and use the showcase routes (e.g. **Integration** at `/`, and paths under `showcase/...`) to browse live examples.

## Tech stack

- **UI**: React 19, Tailwind CSS 4, Lucide icons, react-hook-form / Zod where relevant to primitives
- **Tables**: AG Grid (where `AgGridTable` is used)
- **Build**: Vite 7, TypeScript 5
- **Tests**: Vitest, React Testing Library, jsdom

## External dependencies (summary)

Core runtime libraries include **react-toastify**, **clsx**, **lucide-react**, **ag-grid-react** (for `AgGridTable`), and other packages listed in `package.json`. Import only what you use from the barrel so your bundler can tree-shake unused code.
