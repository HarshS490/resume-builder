import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { WorkExperience } from "../../schemas";

export const workExperienceColumns: ColumnDef<WorkExperience>[] = [
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "startDate",
    header: "From",
    cell: ({ row }) => {
      const date: WorkExperience["startDate"] = row.getValue("startDate");
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
      const date: WorkExperience["endDate"] = row.getValue("endDate");
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
  { accessorKey: "aboutRole", header: "About" },
  {
    accessorKey: "achievements",
    header: "Achievements",
    cell: ({ row }) => {
      const achievements: WorkExperience["achievements"] =
        row.getValue("achievements");
      return achievements.join(", ");
    },
  },
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
