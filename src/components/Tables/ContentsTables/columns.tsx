"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ITools } from "../../../app/(dashboard)/tools-work-paper/_interfaces";
import { FormatMedia, TypeUrlEnum } from "../../../constants/data";
import { Button } from "../../ui/button";
import Link from "next/link";
import Image from "next/image";
import logoVideo from "../../../../public/images/Default/video.png";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { FileIcon, FileVideo } from "lucide-react";
import { Badge } from "../../ui/badge";

export const FILTER_KEYS = ["search_field", "search_value"];

export const columns: ColumnDef<ITools>[] = [
  {
    cell: ({ row }) => row.index + 1,
    header: "No",
  },
  {
    cell: ({ row }) => {
      return (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Image
                width={100}
                height={100}
                alt=""
                src={
                  row.original.format == FormatMedia.IMAGE
                    ? row.original.url
                    : logoVideo
                }
              ></Image>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{row.original.name}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 max-w-md m-auto">
                {row.original.format === FormatMedia.IMAGE ? (
                  <Image
                    src={row.original.url}
                    alt={row.original.name}
                    width={800}
                    height={600}
                    layout="responsive"
                    className="rounded min-w-64"
                  />
                ) : (
                  <div className="flex h-64 items-center justify-center rounded bg-muted">
                    <FileVideo className="h-16 w-16 text-muted-foreground" />
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
    header: "Thumbnail",
  },
  {
    accessorKey: "name",
    header: "Nama Konten",
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
  {
    cell: ({ row }) => (
      row.original.format === FormatMedia.IMAGE ? <Badge variant="outline">Gambar</Badge> : <Badge variant="outline">Video</Badge>
    ),
      header: "Format",
  },
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
    header: "Download / Buka Link",
  },
];
