/**
 * Source of truth for all public subpath exports.
 *
 * Each entry has:
 *   values: runtime exports  (export { ... })
 *   types:  type-only exports (export type { ... })
 *
 * After adding or renaming a subpath here, run:
 *   npm run gen:subpaths
 */

/** @type {Record<string, { values?: string[], types?: string[] }>} */
export const subpaths = {
  // ── Primitives ──────────────────────────────────────────────────────────────
  button: { values: ["Button"] },
  input: { values: ["Input"] },
  textarea: { values: ["Textarea"] },
  checkbox: { values: ["Checkbox"] },
  radio: { values: ["Radio"] },
  switch: { values: ["Switch"] },
  label: { values: ["Label"] },
  slider: { values: ["Slider"] },

  // ── Selection & pickers ─────────────────────────────────────────────────────
  dropdown: { values: ["Dropdown", "DropdownItem", "DropdownSeparator"] },
  multiselect: {
    values: ["MultiSelect"],
    types: ["TreeNode", "MultiSelectProps"],
  },
  "remote-dropdown": { values: ["RemoteDropdown"] },
  "date-picker": { values: ["DatePicker"] },
  "date-range-picker": { values: ["DateRangePicker"] },

  // ── Display ─────────────────────────────────────────────────────────────────
  badge: { values: ["Badge"] },
  chip: { values: ["Chip"] },
  spinner: { values: ["Spinner"] },
  skeleton: { values: ["Skeleton"] },
  progress: { values: ["Progress", "DynamicProgressBar"] },
  alert: { values: ["Alert"] },
  "status-badge": { values: ["StatusBadge"] },

  // ── Table & data ────────────────────────────────────────────────────────────
  table: {
    values: ["Table", "TableCell", "TableRow", "TableHeader", "TableGroupHeaderRow", "TableSkeletonRow"],
    types: ["TableColumn", "TableProps", "ColumnSort", "SortDirection"],
  },
  "table-pagination": { values: ["TablePagination"] },
  "load-more": { values: ["LoadMore"] },

  // ── Overlays ────────────────────────────────────────────────────────────────
  modal: { values: ["Modal"] },
  "modal-drawer": { values: ["ModalDrawer"] },
  tooltip: { values: ["Tooltip"] },
  carousel: { values: ["Carousel", "CarouselSlide", "ImageCarousel"] },

  // ── Navigation ──────────────────────────────────────────────────────────────
  tabs: { values: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"] },
  stepper: { values: ["Stepper"] },
  accordion: { values: ["Accordion"] },

  // ── Media ───────────────────────────────────────────────────────────────────
  "file-upload": {
    values: ["FileUpload"],
    types: ["FileWithUploadProgress", "FileUploadProps"],
  },
  gallery: { values: ["Gallery"] },
  "image-fallback": { values: ["ImageWithFallback"] },

  // ── Advanced ────────────────────────────────────────────────────────────────
  calendar: {
    values: ["CalendarView", "CalendarCell", "HourlyCell", "GridCell", "RowLabelCell", "ViewToggle"],
  },
  card: { values: ["Card", "CardHeader", "CardTitle", "CardDescription", "CardContent", "CardFooter"] },

  // ── Layout / cross-cutting ──────────────────────────────────────────────────
  "page-header": {
    values: ["PageHeader"],
    types: ["PageHeaderProps"],
  },
  "error-boundary": { values: ["ErrorBoundary"] },

  // ── Theme ───────────────────────────────────────────────────────────────────
  theme: {
    values: ["ThemeProvider", "useTheme"],
    types: ["Theme", "ResolvedTheme", "ThemeTokens", "ThemeContextValue", "ThemeProviderProps"],
  },

  // ── Utilities ───────────────────────────────────────────────────────────────
  utils: {
    values: ["cn", "useAnnounce", "useClickOutside", "useDropdownPortal", "useDropdownPortalSimple"],
    types: [
      "DateRange",
      "DropdownAlign",
      "UseDropdownPortalOptions",
      "PortalPosition",
      "UseDropdownPortalSimpleOptions",
      "BaseRowData",
    ],
  },
};
