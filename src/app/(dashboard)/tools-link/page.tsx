"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { useState } from "react";
import { detailPage } from "./_constants";
import { ToolsTable } from "../../../components/Tables/ToolsTables/tools-table";
import { columns, FILTER_KEYS } from "../../../components/Tables/ToolsTables/columns";

const CoursePage = () => {
  const [filterType, setFilterType] = useState<string>("LINK");
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
        {/* <div className="mb-10 w-full">
          <p className="py-3">Filter Tools: </p>
          <MultipleSelector
            defaultOptions={OPTIONS}
            placeholder="Select tools you want filter..."
            onChange={filterChange}
            emptyIndicator={
              <p className="text-gray-600 dark:text-gray-400 text-center text-lg leading-10">
                no results found.
              </p>
            }
          />
        </div> */}
        <ToolsTable
          searchKey="name"
          page={currentPageTool}
          limit={paginationParams.limit}
          columns={columns}
          totalData={totalItemTool}
          data={dataTool}
          totalPage={totalPageTool}
        />
        {/* <Tools tools={dataTool} /> */}
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
