"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { useState } from "react";
import { detailPage } from "./_constants";
import { ContentTable } from "../../../components/Tables/ContentsTables/content-table";
import { columns, FILTER_KEYS } from "../../../components/Tables/ContentsTables/columns";
import PlayerComponent from "../../../components/Players";
import { ChevronDown } from "lucide-react";
import { ITools } from "./_interfaces";
import { ContentGallery } from "../../../components/Tables/ContentsTables/content-gallery";

const ContentPage = () => {
  const [filterType, setFilterType] = useState<string>("CONTENT");
  const { paginationParams, filterParams, sortParams } = useQueryParam(FILTER_KEYS);
  const {
    dataTool,
    currentPageTool,
    totalItemTool,
    totalPageTool,
    refetechDataTool,
    isLoadingTool
  } = useGetAllQuery({
    ...paginationParams,
    filterParams: { types: filterType, ...filterParams },
    ...sortParams,
  });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-5 p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal capitalize sm:px-16 lg:text-2xl xl:px-48">
          Silahkan tonton video dibawah ini, untuk mengetahui cara menggunakan tools marketing content
          </p>
          <h1 className="mb-2 mt-5 text-2xl font-bold">
            Video Panduan (Wajib Ditonton)
          </h1>
          <PlayerComponent
            videoId={process.env.NEXT_PUBLIC_YOUTUBE_ID_CONTENT ?? ""}
          />
          <ChevronDown className="w-full mt-5" width={50} height={50} />
        </div>
        {/* <ContentTable
          searchKey="name"
          searchPlaceholder="nama konten"
          page={currentPageTool}
          limit={paginationParams.limit}
          columns={columns}
          totalData={totalItemTool}
          data={dataTool}
          totalPage={totalPageTool}
        /> */}
         <ContentGallery
          page={currentPageTool}
          limit={paginationParams.limit}
          totalData={totalItemTool}
          data={dataTool}
          totalPage={totalPageTool}
          loading={isLoadingTool}
        />
      </div>
    </DefaultLayout>
  );
};

export default ContentPage;
