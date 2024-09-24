"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Event from "../../../components/Events";
import { detailPage } from "./_constants";

const CoursePage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam();

  const { dataEvent, currentPageEvent, totalItemEvent, totalPageEvent } =
    useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

    const breadcrumbItems = [
      { title: detailPage.baseTitle, link: detailPage.basePath },
      { title: detailPage.title, link: detailPage.basePath + detailPage.path }
    ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <Event events={dataEvent} />
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
