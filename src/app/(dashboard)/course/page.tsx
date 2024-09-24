"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button } from "../../../components/ui/button";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import Course from "../../../components/Courses";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { detailPage } from "./_constants";

const CoursePage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam();

  const { dataCourse, currentPageCourse, totalItemCourse, totalPageCourse } =
    useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

    const breadcrumbItems = [
      { title: detailPage.baseTitle, link: detailPage.basePath },
      { title: detailPage.title, link: detailPage.basePath + detailPage.path }
    ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <Course courses={dataCourse} />
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
