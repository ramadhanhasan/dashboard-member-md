"use client";
import { ColumnDef } from "@tanstack/react-table";
import { IReferralLink } from "../../../app/(dashboard)/links/_interfaces";
import { CellAction } from "./cell-action";

export const FILTER_KEYS = ["search_field", "search_value"];

export const columns: ColumnDef<IReferralLink>[] = [
  {
    accessorKey: "name",
    header: "FUNNEL",
  },
  {
    accessorKey: "type",
    header: "TIPE AFILIASI",
  },
  {
    accessorKey: "url",
    header: "URL",
  },
  {
    header: "ACTION",
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  }
];
