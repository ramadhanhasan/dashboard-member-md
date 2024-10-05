"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Event from "../../../components/Events";
import UserLeads from "../../../components/Tables/UserLeads";
import { UserLeadsTable } from "../../../components/Tables/UserLeadsTables/user-leads-table";
import { columns, FILTER_KEYS } from "../../../components/Tables/UserLeadsTables/columns";
import { detailPage } from "./_constants";

const LeadsPage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam(FILTER_KEYS);

  const { dataLeads, currentPageLeads, totalItemLeads, totalPageLeads } =
    useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

    const breadcrumbItems = [
      { title: detailPage.baseTitle, link: detailPage.basePath },
      { title: detailPage.title, link: detailPage.basePath + detailPage.path }
    ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <UserLeadsTable
          searchKey="name"
          searchPlaceholder="nama"
          page={currentPageLeads}
          limit={paginationParams.limit}
          columns={columns}
          totalData={totalItemLeads}
          data={dataLeads}
          totalPage={totalPageLeads}
        />
      </div>
    </DefaultLayout>
  );
};

export default LeadsPage;
