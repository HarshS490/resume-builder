import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function useCustomTable<ColType>({
  fields,
  remove,
  columns,
}: {
  fields: ColType[];
  remove: (index: number) => void;
  columns: ColumnDef<ColType>[];
}) {
  return useReactTable({
    data: fields,
    columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeRow: (rowIndex: number) => {
        remove(rowIndex);
      },
    },
  });
}
