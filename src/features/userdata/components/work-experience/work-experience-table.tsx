"use client";

import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";
import { TableDisplay } from "../table-display";
import { workExperienceColumns } from "./columns";
import NewWorkExperienceDialog from "./new-work-experience-dialog";
import { WorkExperience } from "./work-experience-schema";
import { getTable } from "../../get-table";

export const WorkExperienceTable = () => {
  const [data, setData] = useState<WorkExperience[]>([]);
  const table = getTable({
    data,
    setData,
    columns: workExperienceColumns,
  });
  return (
    <TableDisplay
      AddNewDialog={NewWorkExperienceDialog}
      columns={workExperienceColumns}
      setData={setData}
      table={table}
    />
  );
};
