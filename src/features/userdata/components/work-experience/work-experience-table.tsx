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
import { workExperienceColumns } from "./columns";
import NewWorkExperienceDialog from "./new-work-experience-dialog";
import { WorkExperience } from "./work-experience-schema";

export const WorkExperienceTable = () => {
  const [data, setData] = useState<WorkExperience[]>([]);
  const table = useReactTable({
    data,
    columns: workExperienceColumns,
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
                  colSpan={workExperienceColumns.length}
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
      <NewWorkExperienceDialog setData={setData} />
    </div>
  );
};
