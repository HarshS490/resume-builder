"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { TableDisplay } from "../table-display";
import { educationColumns } from "./columns";
import { EducationDetails } from "./education-detail-schema";
import NewEducationDetailDialog from "./new-education-detail-dialog";
import { getTable } from "../../get-table";

export const EducationDetailsTable = () => {
  const [data, setData] = useState<EducationDetails[]>([]);
  const table = getTable({
    data,
    setData,
    columns: educationColumns,
  });
  return (
    <TableDisplay
      AddNewDialog={NewEducationDetailDialog}
      columns={educationColumns}
      setData={setData}
      table={table}
    />
  );
};
