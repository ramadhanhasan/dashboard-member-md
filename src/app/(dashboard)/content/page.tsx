"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { useState } from "react";
import { detailPage } from "./_constants";
import { ContentTable } from "../../../components/Tables/ContentsTables/content-table";
import { columns, FILTER_KEYS } from "../../../components/Tables/ContentsTables/columns";

const ContentPage = () => {
  const [filterType, setFilterType] = useState<string>("CONTENT");
  const { paginationParams, filterParams, sortParams } = useQueryParam(FILTER_KEYS);
  const {
    dataTool,
    currentPageTool,
    totalItemTool,
    totalPageTool,
    refetechDataTool,
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
        <ContentTable
          searchKey="name"
          page={currentPageTool}
          limit={paginationParams.limit}
          columns={columns}
          totalData={totalItemTool}
          data={dataTool}
          totalPage={totalPageTool}
        />
      </div>
    </DefaultLayout>
  );
};

export default ContentPage;
