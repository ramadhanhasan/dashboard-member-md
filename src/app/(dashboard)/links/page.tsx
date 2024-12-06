"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import {
  columns,
  FILTER_KEYS,
} from "../../../components/Tables/ReferralLinksTables/columns";
import { ReferralLinksTable } from "../../../components/Tables/ReferralLinksTables/referral-link-table";
import { AuthContext } from "../../../global_context/Auth";
import { useContext } from "react";
import { detailPage } from "./_constants";
import PlayerComponent from "../../../components/Players";
import { ChevronDown } from "lucide-react";
import Loader from "../../../components/common/Loader";

const LinkPage = () => {
  const { paginationParams, filterParams, sortParams } =
    useQueryParam(FILTER_KEYS);
  const { userProfile, isAuth } = useContext(AuthContext);

  const {
    dataReferralLinks,
    currentPageReferralLinks,
    totalItemReferralLinks,
    totalPageReferralLinks,
    isLoadingReferralLinks,
  } = useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  const phone = userProfile?.phone.startsWith("0")
    ? "62" + userProfile.phone.substring(1)
    : userProfile?.phone;

  return (
    <DefaultLayout>
      {/* {isLoadingReferralLinks ? (
        <Loader />
      ) : ( */}
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mb-5 p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal capitalize sm:px-16 lg:text-2xl xl:px-48">
              Silahkan tonton video dibawah ini, untuk mengetahui cara
              menggunakan LINK AFFILIASI
            </p>
            <h1 className="mb-2 mt-5 text-2xl font-bold">
              Video Panduan (Wajib Ditonton)
            </h1>
            <PlayerComponent
              videoId={process.env.NEXT_PUBLIC_YOUTUBE_ID_LINK_AFFILIATE ?? ""}
            />
            <ChevronDown className="mt-5 w-full" width={50} height={50} />
          </div>
          <ReferralLinksTable
            searchKey="name"
            searchPlaceholder="funnel"
            page={currentPageReferralLinks}
            limit={paginationParams.limit}
            columns={columns}
            totalData={totalItemReferralLinks}
            data={dataReferralLinks.map((link) => {
              link.url = `${process.env.NEXT_PUBLIC_URL}/lp?aff=${userProfile?.username}&i=${link.code}&type=${link.type.toLowerCase()}${link.is_whatsapp_link ? "&whatsapp=" + phone : ""}`;
              return link;
            })}
            totalPage={totalPageReferralLinks}
          />
        </div>
      {/* )} */}
    </DefaultLayout>
  );
};

export default LinkPage;
