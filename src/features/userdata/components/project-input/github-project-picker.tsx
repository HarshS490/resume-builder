"use client";
import React from "react";
import { useGetGithubUserRepositories } from "../../api/use-get-github-user-repositories";
import { DataTableUI } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { githubProjectPickerColDef } from "./github-project-picker-col-def";
import { CirclePlusIcon, MagnetIcon } from "lucide-react";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useGithubRepoTableModal } from "../../hooks/use-github-repo-table-modal";
import { ResponsiveModal } from "@/components/responsive-modal";
import { githubRepositoryResponseType } from "../../types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
function useGithubProjectTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return table;
}

type GithubProjectTableProps = {
  onAdd: (items: githubRepositoryResponseType[]) => void;
};

export function GithubProjectTable({ onAdd }: GithubProjectTableProps) {
  const repositories = useGetGithubUserRepositories();
  const table = useGithubProjectTable({
    columns: githubProjectPickerColDef,
    data: repositories.data ?? [],
  });
  const selectedRepositories = table
    .getSelectedRowModel()
    .flatRows.map((item) => item.original);
  return (
    <div>
      <Button>
        <MagnetIcon />
        Auto-pick
      </Button>
      <DataTableUI columns={githubProjectPickerColDef} table={table} />
      <Button onClick={()=>onAdd(selectedRepositories)}>
        <CirclePlusIcon />
        Add to projects
      </Button>
    </div>
  );
}

export function GithubRepoTableModal(props: GithubProjectTableProps) {
  const { isOpen, setIsOpen } = useGithubRepoTableModal();
  return (
    <ResponsiveModal
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Select Github Repositories"
    >
      <GithubProjectTable {...props} />
    </ResponsiveModal>
  );
}
