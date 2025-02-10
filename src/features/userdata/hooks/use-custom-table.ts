import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function useCustomTable<ColType>({
  fields,
  columns,
  setRemoveRow,
}: {
  fields: ColType[];
  columns: ColumnDef<ColType>[];
  setRemoveRow: (index: number) => void;
}) {
  return useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeRow: (rowIndex: number) => {
        setRemoveRow(rowIndex);
      },
    },
  });
}
