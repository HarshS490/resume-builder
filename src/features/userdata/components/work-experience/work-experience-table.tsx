"use client";

import { useState } from "react";
import { useCustomTable } from "../../get-table";
import { TableDisplay } from "../table-display";
import { workExperienceColumns } from "./columns";
import NewWorkExperienceDialog from "./new-work-experience-dialog";
import { WorkExperience } from "./work-experience-schema";

export const WorkExperienceTable = () => {
  const [data, setData] = useState<WorkExperience[]>([]);
  const table = useCustomTable({
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
