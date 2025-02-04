import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { EducationDetails } from "./education-detail-schema";

export const educationColumns: ColumnDef<EducationDetails>[] = [
  {
    accessorKey: "qualification",
    header: "Qualification/Degree",
  },
  {
    accessorKey: "institution",
    header: "School/College",
  },
  {
    accessorKey: "startDate",
    header: "From",
    cell: ({ row }) => {
      const date: EducationDetails["startDate"] = row.getValue("startDate");
      const formattedDate = date.toLocaleString("en-US", {
        month: "long",
        year: "numeric",
      });
      return formattedDate;
    },
  },
  {
    accessorKey: "endDate",
    header: "To",
    cell: ({ row }) => {
      const date: EducationDetails["endDate"] = row.getValue("endDate");
      if (date === "current") {
        return "Present";
      } else {
        const formattedDate = date.toLocaleString("en-US", {
          month: "long",
          year: "numeric",
        });
        return formattedDate;
      }
    },
  },
  { accessorKey: "score", header: "CGPA / Percentage" },
  {
    header: "Actions",
    cell: ({ table, row }) => (
      <Button
        size="icon"
        variant="ghost"
        className="text-red-500 hover:bg-red-500 hover:text-white"
        aria-label="Delete"
        onClick={() => {
          // @ts-expect-error - meta is not part of the type definition
          table.options.meta?.removeRow(row.index);
        }}
      >
        <Trash2 />
      </Button>
    ),
  },
];
