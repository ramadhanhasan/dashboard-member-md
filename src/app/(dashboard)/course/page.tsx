"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Button } from "../../../components/ui/button";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import Course from "../../../components/Courses";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { detailPage } from "./_constants";
import PlayerComponent from "../../../components/Players";
import { ChevronDown } from "lucide-react";
import Loader from "../../../components/common/Loader";

const CoursePage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam();

  paginationParams.limit = 100;

  const {
    dataCourse,
    isLoadingCourse,
    currentPageCourse,
    totalItemCourse,
    totalPageCourse,
  } = useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  return (
    <>
      {isLoadingCourse ? (
        <Loader />
      ) : (
        <DefaultLayout>
          <div className="mx-auto max-w-7xl">
            <Breadcrumbs items={breadcrumbItems} />
            <div className="mb-5 p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal capitalize sm:px-16 lg:text-2xl xl:px-48">
                Sebelum masuk materi, silahkan tonton video panduan dibawah ini
                :
              </p>
              <h1 className="mb-2 mt-5 text-2xl font-bold">
                Video Panduan (Wajib Ditonton)
              </h1>
              <PlayerComponent
                videoId={process.env.NEXT_PUBLIC_YOUTUBE_ID_COURSE ?? ""}
              />
              <ChevronDown className="mt-5 w-full" width={50} height={50} />
            </div>
            <Course courses={dataCourse} />
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default CoursePage;
