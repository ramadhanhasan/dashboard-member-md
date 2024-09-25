"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { columns, FILTER_KEYS } from "../../../components/Tables/ReferralLinksTables/columns";
import { ReferralLinksTable } from "../../../components/Tables/ReferralLinksTables/referral-link-table";
import { AuthContext } from "../../../global_context/Auth";
import { useContext } from "react";
import { detailPage } from "./_constants";

const LinkPage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam(FILTER_KEYS);
  const { userProfile, isAuth } = useContext(AuthContext)

  const { dataReferralLinks, currentPageReferralLinks, totalItemReferralLinks, totalPageReferralLinks } =
    useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

    const breadcrumbItems = [
      { title: detailPage.baseTitle, link: detailPage.basePath },
      { title: detailPage.title, link: detailPage.basePath + detailPage.path }
    ];

  const phone = userProfile?.phone.startsWith("0") ? "62" + userProfile.phone.substring(1) : userProfile?.phone; 

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <ReferralLinksTable
          searchKey="name"
          page={currentPageReferralLinks}
          limit={paginationParams.limit}
          columns={columns}
          totalData={totalItemReferralLinks}
          data={dataReferralLinks.map(link => {
            link.url = `${process.env.NEXT_PUBLIC_URL}/lp?aff=${userProfile?.username}&i=${link.code}&type=${link.type.toLowerCase()}&whatsapp=${link.is_whatsapp_link ? phone : ''}`
            return link
          })}
          totalPage={totalPageReferralLinks}
        />
      </div>
    </DefaultLayout>
  );
};

export default LinkPage;
