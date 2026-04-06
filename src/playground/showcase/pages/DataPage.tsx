import { AgGridTable } from "@components/ui/AgGridTable";
import LoadMore from "@components/ui/LoadMore";
import {
  Table,
  type TableColumn,
} from "@components/ui/Table";
import { TablePagination } from "@components/ui/TablePagination";
import type { ColDef } from "ag-grid-community";
import { useMemo, useState } from "react";

import { DemoSection } from "../DemoSection";

type CarRow = { id: string; make: string; model: string; price: number };

const carData: CarRow[] = [
  { id: "1", make: "Toyota", model: "Corolla", price: 24000 },
  { id: "2", make: "Honda", model: "Civic", price: 26000 },
  { id: "3", make: "Ford", model: "Focus", price: 22000 },
];

export function DataPage(): React.ReactElement {
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const totalItems = 45;
  const totalPages = Math.ceil(totalItems / pageSize);

  const tableColumns: TableColumn<CarRow>[] = useMemo(
    () => [
      { key: "make", header: "Make", sortable: true },
      { key: "model", header: "Model", sortable: true },
      {
        key: "price",
        header: "Price",
        sortable: true,
        render: (v) => `$${Number(v).toLocaleString()}`,
      },
    ],
    [],
  );

  const gridColumns: ColDef<CarRow>[] = useMemo(
    () => [
      { field: "make", sortable: true },
      { field: "model", sortable: true },
      { field: "price", sortable: true },
    ],
    [],
  );

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      <DemoSection
        id="table"
        title="Table"
        description="Client-side sort, selection, striped rows, empty state."
        props={[
          { name: "columns / data", description: "TableColumn[] and row objects with id." },
          { name: "sortMode", description: "client | remote" },
          { name: "selectable / selectedRows / onRowSelect", description: "Row selection." },
        ]}
      >
        <Table<CarRow>
          columns={tableColumns}
          data={carData}
          striped
          sortMode="client"
        />
      </DemoSection>

      <DemoSection
        id="table-pagination"
        title="TablePagination"
        props={[
          { name: "currentPage / totalPages / pageSize / totalItems", description: "Paging model." },
          { name: "onPageChange", description: "(page: number) => void" },
          { name: "onPageSizeChange", description: "Optional page size dropdown." },
        ]}
      >
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={setPage}
          onPageSizeChange={() => undefined}
        />
      </DemoSection>

      <DemoSection
        id="load-more"
        title="LoadMore"
        description="End-of-list indicator; parent typically appends rows when user scrolls."
        props={[
          { name: "currentPage / totalPages / pageSize / totalItems", description: "Progress copy." },
          { name: "loading", description: "Shows spinner state." },
        ]}
      >
        <div className="space-y-6">
          <LoadMore
            currentPage={2}
            totalPages={5}
            pageSize={10}
            totalItems={45}
          />
          <LoadMore
            currentPage={1}
            totalPages={3}
            pageSize={10}
            totalItems={25}
            loading
          />
        </div>
      </DemoSection>

      <DemoSection
        id="ag-grid"
        title="AgGridTable"
        description="Wraps ag-grid-react with shared theme class and optional server pagination."
        props={[
          { name: "columnDefs / rowData / getRowId", description: "Standard AG Grid contract." },
          { name: "height", description: "Pixel height of the grid body." },
          { name: "pagination", description: "Built-in pagination UI when client-side." },
        ]}
      >
        <div className="h-[360px] w-full min-w-0">
          <AgGridTable<CarRow>
            rowData={carData}
            columnDefs={gridColumns}
            getRowId={(row) => row.id}
            height={360}
            pagination={false}
          />
        </div>
      </DemoSection>
    </div>
  );
}
