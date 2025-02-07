import {
  type ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export function useCustomTable<ColType>({
  data,
  setData,
  columns,
}: {
  data: ColType[];
  setData: React.Dispatch<React.SetStateAction<ColType[]>>;
  columns: ColumnDef<ColType>[];
}) {
  return useReactTable({
    data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeRow: (rowIndex: number) => {
        setData((prev) => prev.filter((_, i) => i !== rowIndex));
      },
    },
  });
}
