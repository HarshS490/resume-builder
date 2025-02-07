"use client";

import { useState } from "react";
import { useCustomTable } from "../../get-table";
import { TableDisplay } from "../table-display";
import { educationColumns } from "./columns";
import { EducationDetails } from "./education-detail-schema";
import NewEducationDetailDialog from "./new-education-detail-dialog";

export const EducationDetailsTable = () => {
  const [data, setData] = useState<EducationDetails[]>([]);
  const table = useCustomTable({
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
