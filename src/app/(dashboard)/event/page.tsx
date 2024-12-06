"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Event from "../../../components/Events";
import { detailPage } from "./_constants";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { useState } from "react";
import { FormLabel } from "../../../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Separator } from "../../../components/ui/separator";
import Loader from "../../../components/common/Loader";

const CoursePage = () => {
  let { paginationParams, filterParams, sortParams } = useQueryParam();
  // const [filterPeriod, setFilterPeriod] = useState<string>("is_in_feature");
  paginationParams.limit = 100;

  filterParams = { ...filterParams, is_finished: "true" };

  const dataEventPassed = useGetAllQuery({
    ...paginationParams,
    filterParams,
    ...sortParams,
  });

  filterParams = { ...filterParams, is_in_feature: "true" };
  delete filterParams.is_finished;

  const { dataEvent, refetechDataEvent, isLoadingEvent } = useGetAllQuery({
    ...paginationParams,
    filterParams,
    ...sortParams,
  });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  // const handleTabChange = (value: string) => {
  //   setFilterPeriod(value);
  // };

  const handleImplementationChange = (value: string) => {
    if (value === "all") {
      delete filterParams["implementation"];
    } else {
      filterParams["implementation"] = value;
    }
    refetechDataEvent();
  };

  return (
    <DefaultLayout>
      {isLoadingEvent ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} />
          {/* <Tabs
          onValueChange={handleTabChange}
          defaultValue="is_in_feature"
          className="w-full"
        >
          <TabsList className="w-full">
            <TabsTrigger className="text-sm lg:text-lg" value="is_in_feature">
              Event Akan Datang
            </TabsTrigger>
            <TabsTrigger className="text-sm lg:text-lg" value="is_finished">
              Event Yang Sudah Selesai
            </TabsTrigger>
          </TabsList> */}
          {/* <TabsContent value="is_in_feature"> */}
          <div className="m-auto mb-10 mt-5 text-center">
            <h1 className="text-2xl font-semibold">Event Akan Datang</h1>
            {/* <Select
                onValueChange={handleImplementationChange}
                defaultValue={""}
              >
                <SelectTrigger className="lg:text-md px-5 py-1 text-sm">
                  <SelectValue placeholder="Pilih untuk filter Offline / Online" />
                </SelectTrigger>
                <SelectContent
                  ref={(ref) => {
                    if (!ref) return;
                    ref.ontouchstart = (e) => {
                      e.preventDefault();
                    };
                  }}
                  className="text-sm"
                >
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select> */}
          </div>
          {dataEvent.length === 0 && !isLoadingEvent && (
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
                  <h2 className="pb-1 text-center text-base leading-relaxed text-black">
                    Saat ini belum ada event...
                  </h2>
                  {/* <p className="pb-4 text-center text-sm font-normal leading-snug text-black">
                    Cobalah untuk menghapus filter Kamu
                  </p> */}
                </div>
              </div>
            </div>
          )}
          <Event events={dataEvent} />
          {/* </TabsContent> */}
          {/* <TabsContent value="is_finished"> */}
          <Separator className="mt-10" />
          <div className="m-auto mb-10 mt-5 text-center">
            <h1 className="text-2xl font-semibold">Event Yang Sudah Selesai</h1>

            {/* <Select
                onValueChange={handleImplementationChange}
                defaultValue={""}
              >
                <SelectTrigger className="lg:text-md px-5 py-1 text-sm">
                  <SelectValue placeholder="Pilih untuk filter Offline / Online" />
                </SelectTrigger>
                <SelectContent
                  ref={(ref) => {
                    if (!ref) return;
                    ref.ontouchstart = (e) => {
                      e.preventDefault();
                    };
                  }}
                  className="text-sm"
                >
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select> */}
          </div>
          {dataEventPassed.dataEvent.length === 0 &&
            !dataEventPassed.isLoadingEvent && (
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
                    <h2 className="pb-1 text-center text-base leading-relaxed text-black">
                      Tidak menemukan event...
                    </h2>
                    {/* <p className="pb-4 text-center text-sm font-normal leading-snug text-black">
                    Cobalah untuk menghapus filter Kamu
                  </p> */}
                  </div>
                </div>
              </div>
            )}
          <Event events={dataEventPassed.dataEvent} />
          {/* </TabsContent> */}
          {/* </Tabs> */}
        </div>
      )}
    </DefaultLayout>
  );
};

export default CoursePage;
