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
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { educationColumns } from "./columns";
import NewEducationDetailDialog from "./new-education-detail-dialog";
import { EducationDetails } from "./education-detail-schema";

export const EducationDetailsTable = () => {
  const [data, setData] = useState<EducationDetails[]>([]);
  const table = useReactTable({
    data,
    columns: educationColumns,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      removeRow: (rowIndex: number) => {
        setData((prev) => prev.filter((_, i) => i !== rowIndex));
      },
    },
  });
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
                  colSpan={educationColumns.length}
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
      <NewEducationDetailDialog setData={setData} />
    </div>
  );
};
