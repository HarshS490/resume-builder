"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  flexRender,
  type ColumnDef,
  type Table as TableType,
} from "@tanstack/react-table";

export function TableDisplay<DataType>({
  columns,
  AddNewDialog,
  table,
  setData,
}: {
  columns: ColumnDef<DataType>[];
  AddNewDialog: React.FC<{
    setData: React.Dispatch<React.SetStateAction<DataType[]>>;
  }>;
  table: TableType<DataType>;
  setData: React.Dispatch<React.SetStateAction<DataType[]>>;
}) {
  {
    return (
      <div className="max-w-prose mx-auto ">
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="text-center text-muted-foreground"
                  >
                    No details added
                  </TableCell>
                </TableRow>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <AddNewDialog setData={setData} />
      </div>
    );
  }
}
