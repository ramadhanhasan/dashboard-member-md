"use client";
import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ITools } from "../../../app/(dashboard)/content/_interfaces";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import Image from "next/image";
import Link from "next/link";

interface DataTableProps<TData, TValue> {
  data: ITools[];
  limit: number;
  page: number;
  totalData: number;
  totalPage: number;
  pageSizeOptions?: number[];
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
  loading?: boolean;
}

export function ContentGallery<TData, TValue>({
  data,
  page,
  totalData,
  totalPage,
  pageSizeOptions = [10, 20, 30, 40, 50],
  limit,
  loading,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string | null>(null);

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: page - 1,
      pageSize: limit,
    });

  React.useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        limit: pageSize,
        search_field: "name",
        search_value: searchValue ? searchValue : "",
      })}`,
      {
        scroll: false,
      },
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize]);

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      router.push(
        `${pathname}?${createQueryString({
          page: pageIndex + 1,
          limit: pageSize,
          search_field: "name",
          search_value: searchValue ? searchValue : "",
        })}`,
        {
          scroll: false,
        },
      );

      setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    }, 500);
    return () => clearTimeout(timeOutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  return (
    <>
      <div className="max-w-[calc(100vw-40px)] rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <Input
            placeholder={`Cari konten...`}
            value={(searchValue as string) ?? ""}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            className="mb-5 w-full"
          />
          {data.length === 0 && !loading && (
            <div className="flex w-full flex-wrap items-center justify-center gap-10">
              <div className="grid w-60 gap-4">
                <div className="bg-gray-50 mx-auto inline-flex h-20 w-20 items-center justify-center rounded-full shadow-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="32"
                    viewBox="0 0 33 32"
                    fill="none"
                  >
                    <g id="File Serch">
                      <path
                        id="Vector"
                        d="M19.9762 4V8C19.9762 8.61954 19.9762 8.92931 20.0274 9.18691C20.2379 10.2447 21.0648 11.0717 22.1226 11.2821C22.3802 11.3333 22.69 11.3333 23.3095 11.3333H27.3095M18.6429 19.3333L20.6429 21.3333M19.3095 28H13.9762C10.205 28 8.31934 28 7.14777 26.8284C5.9762 25.6569 5.9762 23.7712 5.9762 20V12C5.9762 8.22876 5.9762 6.34315 7.14777 5.17157C8.31934 4 10.205 4 13.9762 4H19.5812C20.7604 4 21.35 4 21.8711 4.23403C22.3922 4.46805 22.7839 4.90872 23.5674 5.79006L25.9624 8.48446C26.6284 9.23371 26.9614 9.60833 27.1355 10.0662C27.3095 10.524 27.3095 11.0253 27.3095 12.0277V20C27.3095 23.7712 27.3095 25.6569 26.138 26.8284C24.9664 28 23.0808 28 19.3095 28ZM19.3095 16.6667C19.3095 18.5076 17.8171 20 15.9762 20C14.1352 20 12.6429 18.5076 12.6429 16.6667C12.6429 14.8257 14.1352 13.3333 15.9762 13.3333C17.8171 13.3333 19.3095 14.8257 19.3095 16.6667Z"
                        stroke="#4F46E5"
                        stroke-width="1.6"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                  </svg>
                </div>
                <div>
                  <h2 className="pb-1 text-center text-base font-semibold leading-relaxed text-black">
                    Tidak menemukan konten...
                  </h2>
                  <p className="pb-4 text-center text-sm font-normal leading-snug text-black">
                    Cobalah untuk menghapus pencarian Kamu
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className="mb-5 columns-2 gap-2 md:columns-3 xl:columns-5">
            {data.map((tool: ITools) => (
              <div className="relative mb-2 break-inside-avoid">
                <div className="absolute left-0 top-0 w-full">
                  <span className="rounded-r-md bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {tool.format}
                  </span>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Image
                      width={1000}
                      height={1000}
                      alt=""
                      src={tool.url}
                    ></Image>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>{`${tool.name} (${tool.format})`}</DialogTitle>
                    </DialogHeader>
                    <div className="m-auto mt-4 max-w-md">
                      <Image
                        src={tool.url}
                        alt={tool.name}
                        width={800}
                        height={600}
                        layout="responsive"
                        className="mb-5 min-w-64 rounded"
                      />
                      <Link
                        target="_blank"
                        rel="noopener noreferrer"
                        href={
                          tool.custom_url && tool.custom_url != ""
                            ? tool.custom_url
                            : tool.url || ""
                        }
                      >
                        <Button className="w-full text-white">Buka Link</Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-end gap-2 space-x-2 py-4 sm:flex-row">
            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center space-x-2">
                  <p className="whitespace-nowrap text-sm font-medium">
                    Data per halaman
                  </p>
                  <Select
                    value={`${pageSize}`}
                    onValueChange={(value) => {
                      setPagination({ pageSize: Number(value), pageIndex });
                    }}
                  >
                    <SelectTrigger className="h-8 w-[70px]">
                      <SelectValue placeholder={pageSize} />
                    </SelectTrigger>
                    <SelectContent side="top">
                      {pageSizeOptions.map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                          {pageSize}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-between gap-2 sm:justify-end">
              <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                Halaman {pageIndex + 1} of {totalPage}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  aria-label="Go to first page"
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() => setPagination({ pageSize, pageIndex: 0 })}
                  disabled={pageIndex === 0}
                >
                  <DoubleArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  aria-label="Go to previous page"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setPagination({ pageSize, pageIndex: pageIndex - 1 })
                  }
                  disabled={pageIndex === 0}
                >
                  <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  aria-label="Go to next page"
                  variant="outline"
                  className="h-8 w-8 p-0"
                  onClick={() =>
                    setPagination({ pageSize, pageIndex: pageIndex + 1 })
                  }
                  disabled={pageIndex === totalPage - 1}
                >
                  <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button
                  aria-label="Go to last page"
                  variant="outline"
                  className="hidden h-8 w-8 p-0 lg:flex"
                  onClick={() =>
                    setPagination({ pageSize, pageIndex: totalPage - 1 })
                  }
                  disabled={pageIndex === totalPage - 1}
                >
                  <DoubleArrowRightIcon
                    className="h-4 w-4"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
