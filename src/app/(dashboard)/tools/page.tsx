"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Event from "../../../components/Events";
import Tools from "../../../components/Tools";
import { TypeToolEnum } from "../../../constants/data";
import MultipleSelector, { Option } from "../../../components/ui/multiple-selector";
import { useState } from "react";

export const detailPage = {
  baseTitle: 'Dashboard',
  basePath : '/',
  title: 'Tools Marketing',
  path: 'tools',
}

const OPTIONS: Option[] = [
  { label: TypeToolEnum.BANNER, value: TypeToolEnum.BANNER },
  { label: TypeToolEnum.STORY, value: TypeToolEnum.STORY },
  { label: TypeToolEnum.FEED, value: TypeToolEnum.FEED },
  { label: TypeToolEnum['WORK PAPER'], value: TypeToolEnum['WORK PAPER'] },
  { label: TypeToolEnum.LINK, value: TypeToolEnum.LINK },
];


const CoursePage = () => {
  const { paginationParams, sortParams } = useQueryParam();
  const [filterType, setFilterType] = useState<string>('');

  const { dataTool, currentPageTool, totalItemTool, totalPageTool, refetechDataTool } =
    useGetAllQuery({ ...paginationParams, filterParams : {types: filterType}, ...sortParams });

    const breadcrumbItems = [
      { title: detailPage.baseTitle, link: detailPage.basePath },
      { title: detailPage.title, link: detailPage.basePath + detailPage.path }
    ];

    const filterChange = (option: Option[]) => {
      setFilterType((option.map(opt => opt.value)).join(','))
      refetechDataTool()
    };

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="w-full mb-10">
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
      </div>
        <Tools tools={dataTool}/>
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
