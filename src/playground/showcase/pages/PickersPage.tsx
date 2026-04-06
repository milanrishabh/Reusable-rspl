import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@components/ui/Dropdown";
import { DatePicker } from "@components/ui/DatePicker";
import DateRangePicker from "@components/ui/DateRangePicker";
import MultiSelect from "@components/ui/MultiSelect";
import RemoteDropdown, {
  type DropdownOption,
  type RemoteDataResponse,
  type SearchParams,
} from "@components/ui/RemoteDropdown";
import type { DateRange } from "@lib/types/dateRange";
import { useCallback, useState } from "react";

import { DemoSection } from "../DemoSection";

const treeOptions = [
  { id: "1", label: "North", value: "north" },
  {
    id: "2",
    label: "South",
    value: "south",
    children: [
      { id: "2a", label: "South · A", value: "south-a" },
      { id: "2b", label: "South · B", value: "south-b" },
    ],
  },
];

const allRemote: DropdownOption[] = Array.from({ length: 40 }, (_, i) => ({
  id: String(i + 1),
  label: `Option ${i + 1}`,
  value: `opt-${i + 1}`,
}));

export function PickersPage(): React.ReactElement {
  const [dateRangeStr, setDateRangeStr] = useState("");
  const [range, setRange] = useState<DateRange>({ from: null, to: null });
  const [multi, setMulti] = useState<string[]>([]);
  const [remoteVal, setRemoteVal] = useState<DropdownOption | null>(null);
  const [tier, setTier] = useState("beta");

  const mockFetcher = useCallback(
    async (params: SearchParams): Promise<RemoteDataResponse<DropdownOption>> => {
      await new Promise((r) => setTimeout(r, 200));
      const page = params.page ?? 0;
      const size = params.size ?? 10;
      const q = String(params.search ?? "")
        .trim()
        .toLowerCase();
      const filtered = q
        ? allRemote.filter((o) => o.label.toLowerCase().includes(q))
        : allRemote;
      const start = page * size;
      const slice = filtered.slice(start, start + size);
      const totalPages = Math.max(1, Math.ceil(filtered.length / size));
      return {
        content: slice,
        totalElements: filtered.length,
        totalPages,
        size,
        number: page,
        first: page === 0,
        last: page >= totalPages - 1,
        empty: slice.length === 0,
        numberOfElements: slice.length,
      };
    },
    [],
  );

  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <DemoSection
        id="datepicker"
        title="DatePicker"
        props={[
          {
            name: "value / onChange",
            description: "String range display; onChange when Apply is used.",
          },
          { name: "error", description: "Validation message." },
        ]}
      >
        <div className="max-w-xs">
          <DatePicker
            value={dateRangeStr}
            onChange={setDateRangeStr}
            placeholder="Open calendar"
          />
        </div>
      </DemoSection>

      <DemoSection
        id="daterange"
        title="DateRangePicker"
        props={[
          { name: "value", description: "DateRange { from, to }." },
          { name: "presets / isActionsVisible", description: "Shortcuts and footer actions." },
        ]}
      >
        <div className="max-w-md">
          <DateRangePicker value={range} onChange={setRange} isActionsVisible />
        </div>
      </DemoSection>

      <DemoSection
        id="multiselect"
        title="MultiSelect"
        props={[
          { name: "options", description: "TreeNode[] with optional children." },
          { name: "value / onChange", description: "string[] of selected values." },
          { name: "onRemoteSearch / onRemoteLoadMore", description: "Server-driven lists." },
        ]}
      >
        <div className="max-w-md">
          <MultiSelect
            options={treeOptions}
            value={multi}
            onChange={setMulti}
            placeholder="Choose regions…"
          />
        </div>
      </DemoSection>

      <DemoSection
        id="dropdown"
        title="Dropdown (composition)"
        description="Dropdown + DropdownTrigger + DropdownContent + DropdownItem. Use name/value/onChange for hidden field integration."
        props={[
          { name: "DropdownTrigger children", description: "Trigger label (avoid nested buttons)." },
        ]}
      >
        <div className="max-w-xs">
          <Dropdown name="tier" value={tier} onChange={setTier}>
            <DropdownTrigger>
              <span>Selected: {tier}</span>
            </DropdownTrigger>
            <DropdownContent>
              <DropdownItem value="alpha">alpha</DropdownItem>
              <DropdownItem value="beta">beta</DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      </DemoSection>

      <DemoSection
        id="remote-dropdown"
        title="RemoteDropdown"
        description="Async options via fetcher returning paginated RemoteDataResponse."
        props={[
          { name: "fetcher", description: "async (params) => page of DropdownOption." },
          { name: "searchable", description: "Passes search term into params." },
        ]}
      >
        <div className="max-w-md">
          <RemoteDropdown
            fetcher={mockFetcher}
            value={remoteVal}
            onSelectionChange={(v) => setRemoteVal(v as DropdownOption | null)}
            placeholder="Search remote list…"
            searchable
            pageSize={10}
          />
        </div>
      </DemoSection>
    </div>
  );
}
