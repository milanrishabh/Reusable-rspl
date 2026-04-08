# @rspl/react-reusable-ui

A React 19 component library built with Tailwind CSS v4. 35+ production-ready components with dark mode support, runtime theming, and full TypeScript types.

---

## Installation

```bash
npm install @rspl/react-reusable-ui
```

**Peer dependencies** — React must be installed by your app:

```bash
npm install react react-dom
```

---

## Setup

### 1. Import the stylesheet

Add this once at your app root (e.g. `main.tsx`):

```tsx
import "@rspl/react-reusable-ui/style.css";
```

### 2. Wrap your app with `ThemeProvider`

`ThemeProvider` manages light/dark mode and optional token overrides. Place it as high in the tree as possible:

```tsx
import { ThemeProvider } from "@rspl/react-reusable-ui";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system">
    <App />
  </ThemeProvider>,
);
```

---

## Basic usage

```tsx
import { Button, Input, Modal } from "@rspl/react-reusable-ui";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Input label="Name" placeholder="Enter your name" />
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} title="Hello">
        Modal content
      </Modal>
    </>
  );
}
```

---

## Tree-shakeable subpath imports

Every component is available via its own subpath so bundlers only include what you use:

```tsx
import { Button } from "@rspl/react-reusable-ui/button";
import { Modal } from "@rspl/react-reusable-ui/modal";
import { Table, type TableColumn } from "@rspl/react-reusable-ui/table";
import { ThemeProvider, useTheme } from "@rspl/react-reusable-ui/theme";
import { cn, useAnnounce } from "@rspl/react-reusable-ui/utils";
```

| Subpath              | Exports                                                                        |
| -------------------- | ------------------------------------------------------------------------------ |
| `/button`            | Button                                                                         |
| `/input`             | Input                                                                          |
| `/textarea`          | Textarea                                                                       |
| `/checkbox`          | Checkbox                                                                       |
| `/radio`             | Radio                                                                          |
| `/switch`            | Switch                                                                         |
| `/label`             | Label                                                                          |
| `/slider`            | Slider                                                                         |
| `/dropdown`          | Dropdown, DropdownItem, DropdownSeparator                                      |
| `/multiselect`       | MultiSelect, TreeNode, MultiSelectProps                                        |
| `/remote-dropdown`   | RemoteDropdown                                                                 |
| `/date-picker`       | DatePicker                                                                     |
| `/date-range-picker` | DateRangePicker                                                                |
| `/badge`             | Badge                                                                          |
| `/chip`              | Chip                                                                           |
| `/spinner`           | Spinner                                                                        |
| `/skeleton`          | Skeleton                                                                       |
| `/progress`          | Progress, DynamicProgressBar                                                   |
| `/alert`             | Alert                                                                          |
| `/status-badge`      | StatusBadge                                                                    |
| `/table`             | Table, TableCell, TableRow, TableHeader, TableGroupHeaderRow, TableSkeletonRow |
| `/table-pagination`  | TablePagination                                                                |
| `/load-more`         | LoadMore                                                                       |
| `/modal`             | Modal                                                                          |
| `/modal-drawer`      | ModalDrawer                                                                    |
| `/tooltip`           | Tooltip                                                                        |
| `/carousel`          | Carousel, CarouselSlide, ImageCarousel                                         |
| `/tabs`              | Tabs, TabsList, TabsTrigger, TabsContent                                       |
| `/stepper`           | Stepper                                                                        |
| `/accordion`         | Accordion                                                                      |
| `/file-upload`       | FileUpload, FileWithUploadProgress, FileUploadProps                            |
| `/gallery`           | Gallery                                                                        |
| `/image-fallback`    | ImageWithFallback                                                              |
| `/calendar`          | CalendarView, CalendarCell, HourlyCell, GridCell, RowLabelCell, ViewToggle     |
| `/card`              | Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter          |
| `/page-header`       | PageHeader, PageHeaderProps                                                    |
| `/error-boundary`    | ErrorBoundary                                                                  |
| `/theme`             | ThemeProvider, useTheme, Theme, ResolvedTheme, ThemeTokens                     |
| `/utils`             | cn, useAnnounce, useClickOutside, useDropdownPortal, date utilities            |

---

## Dark mode

The library uses Tailwind's `class` strategy — `.dark` is applied on the `ThemeProvider` wrapper element. Components respond automatically.

### Toggle between light and dark

```tsx
import { useTheme } from "@rspl/react-reusable-ui/theme";

function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === "dark" ? "Switch to light" : "Switch to dark"}
    </button>
  );
}
```

### Set a specific theme

```tsx
const { setTheme } = useTheme();

setTheme("dark"); // force dark
setTheme("light"); // force light
setTheme("system"); // follow OS preference (default)
```

### ThemeProvider props

| Prop           | Type                            | Default        | Description                          |
| -------------- | ------------------------------- | -------------- | ------------------------------------ |
| `defaultTheme` | `"light" \| "dark" \| "system"` | `"system"`     | Initial theme                        |
| `storageKey`   | `string`                        | `"rspl-theme"` | localStorage key for persistence     |
| `tokens`       | `ThemeTokens`                   | —              | CSS variable overrides (see below)   |
| `className`    | `string`                        | —              | Extra classes on the wrapper element |

---

## Runtime token overrides

Every color in the library is a CSS custom property. Pass `tokens` to `ThemeProvider` to rebrand the library without a build step:

```tsx
<ThemeProvider
  tokens={{
    "--color-rspl-primary-500": "#7c3aed",
    "--color-rspl-primary-600": "#6d28d9",
    "--color-rspl-primary-700": "#5b21b6",
    "--color-rspl-secondary-500": "#10b981",
  }}
>
  <App />
</ThemeProvider>
```

### Token families

| Token family     | Example variable                  | Default                 |
| ---------------- | --------------------------------- | ----------------------- |
| Primary          | `--color-rspl-primary-{50–900}`   | Blue (`#2176cc` at 500) |
| Secondary        | `--color-rspl-secondary-{50–900}` | Cyan (`#60b8e7` at 500) |
| Neutral          | `--color-rspl-neutral-{50–900}`   | Grey                    |
| Success          | `--color-rspl-success-{50–900}`   | Green                   |
| Error            | `--color-rspl-error-{50–900}`     | Red                     |
| Warning          | `--color-rspl-warning-{50–900}`   | Orange                  |
| Container border | `--color-container-border`        | `#e2e8f0`               |

---

## Adding a new component

1. Create `src/components/ui/YourComponent.tsx`.
2. Export it from `src/index.ts`.
3. Add an entry to `scripts/lib-subpaths-manifest.mjs`.
4. Run `npm run gen:subpaths` — regenerates `src/subpaths/` files and `package.json` exports.
5. Run `npm run build` to verify the output.

---

## Scripts

| Script                   | Description                                      |
| ------------------------ | ------------------------------------------------ |
| `npm run dev`            | Start the component showcase at `localhost:4700` |
| `npm run build`          | Build the library to `dist/`                     |
| `npm run build:app`      | Build the showcase app                           |
| `npm run gen:subpaths`   | Regenerate subpath files from the manifest       |
| `npm run test`           | Run all unit tests                               |
| `npm run test:coverage`  | Run tests with coverage report                   |
| `npm run lint`           | Lint all TypeScript files                        |
| `npm run prettier:write` | Auto-format all source files                     |

---

## Publishing

```bash
# Build and verify output
npm run build
npm pack --dry-run

# First publish (scoped package requires --access public)
npm publish --access public
```

---

## License

MIT
