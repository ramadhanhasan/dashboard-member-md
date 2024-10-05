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

const CoursePage = () => {
  let { paginationParams, filterParams, sortParams } = useQueryParam();
  const [filterPeriod, setFilterPeriod] = useState<string>("is_in_feature");
  paginationParams.limit = 100;

  filterParams = { ...filterParams, [filterPeriod]: "true" };

  const { dataEvent, refetechDataEvent } = useGetAllQuery({
    ...paginationParams,
    filterParams,
    ...sortParams,
  });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  const handleTabChange = (value: string) => {
    setFilterPeriod(value);
  };

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
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <Tabs
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
          </TabsList>
          <TabsContent value="is_in_feature">
            <div className="m-auto mb-10 mt-5 max-w-sm">
              <Select
                onValueChange={handleImplementationChange}
                defaultValue={""}
              >
                <SelectTrigger className="px-5 py-1 text-sm lg:text-md">
                  <SelectValue placeholder="Pilih untuk filter Offline / Online" />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Event events={dataEvent} />
          </TabsContent>
          <TabsContent value="is_finished">
          <div className="m-auto mb-10 mt-5 max-w-sm">
          <Select
                onValueChange={handleImplementationChange}
                defaultValue={""}
              >
                <SelectTrigger className="px-5 py-1 text-sm lg:text-md">
                  <SelectValue placeholder="Pilih untuk filter Offline / Online" />
                </SelectTrigger>
                <SelectContent className="text-sm">
                  <SelectItem value="all">Semua</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Event events={dataEvent} />
          </TabsContent>
        </Tabs>
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
