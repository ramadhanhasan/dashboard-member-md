"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "@/components/ui/switch";
import TimestampConverter from "../../../utils/dateFormatter";
import { IUserLead } from "../../../app/(dashboard)/leads/_interfaces";
import { ITools } from "../../../app/(dashboard)/tools-work-paper/_interfaces";
import { TypeUrlEnum } from "../../../constants/data";
import { Button } from "../../ui/button";
import Link from "next/link";

export const FILTER_KEYS = ["search_field", "search_value"];

export const columns: ColumnDef<ITools>[] = [
  {
    cell: ({ row }) => (
      row.index + 1
    ),
    header: "No",
  },
  {
    accessorKey: "name",
    header: "Title Bantuan",
  },
  {
    header: "Deskripsi",
    cell: ({ row }) => (
      <div
        className="ql-editor truncate-1"
        dangerouslySetInnerHTML={{ __html: row.original.description ?? "" }}
      />
    ),
  },
  // {
  //   accessorKey: "format",
  //   header: "Format",
  // },
  // {
  //   cell: ({ row }) => (row.original.type === "LINK" ? "Link" : "Lembar Kerja"),
  //   header: "Tipe",
  // },
  {
    cell: ({ row }) => {
      return row.original.type_url === TypeUrlEnum.LINK ? (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={
            row.original.custom_url && row.original.custom_url != ""
              ? row.original.custom_url
              : row.original.url || ""
          }
        >
          <Button className="w-full text-white">Buka Link</Button>
        </Link>
      ) : (
        <Link
          target="_blank"
          rel="noopener noreferrer"
          href={
            row.original.custom_url && row.original.custom_url != ""
              ? row.original.custom_url
              : row.original.url || ""
          }
        >
          <Button className="w-full text-white">Download</Button>
        </Link>
      );
    },
    header: "Buka Link",
  },
];
