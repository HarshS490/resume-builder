"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { useGetGithubUserRepoReadme } from "../../api/use-get-github-user-repository";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type RepoType = {
  owner: {
    login: string;
  };
  name: string;
};

export const repoDataColumnsDef: ColumnDef<RepoType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    id: "generate",
    header: "Generate",
    cell: ({ row }) => {
      const owner = row.original.owner.login;
      const repo = row.original.name;
      return <GenerateButton key={repo} repo={repo} owner={owner} />;
    },
  },
];

type GenerateButtonProps = {
  repo: string;
  owner: string;
};
const GenerateButton = ({ repo, owner }: GenerateButtonProps) => {
  console.log("Bottom level rerender", repo)
  const { data, refetch, isStale } = useGetGithubUserRepoReadme({
    owner,
    repo,
  });
  const onClick = () => {
    console.log("stale",isStale)
    if (!data || isStale) {
      refetch();
    }
  };
  return <Button type="button" onClick={onClick}>Generate</Button>;
};
