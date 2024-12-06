"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllOrderQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { detailPage } from "./_constants";
import { OrdersTable } from "../../../components/Tables/OrdersTables/order-table";
import {
  columns,
  FILTER_KEYS,
} from "../../../components/Tables/OrdersTables/columns";
import Loader from "../../../components/common/Loader";

const LinkPage = () => {
  const { paginationParams, filterParams, sortParams } =
    useQueryParam(FILTER_KEYS);

  const {
    dataOrders,
    currentPageOrders,
    totalItemOrders,
    totalPageOrders,
    isLoadingOrders,
  } = useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  return (
    <DefaultLayout>
      {isLoadingOrders ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} />
          <OrdersTable
            searchKey="order_number"
            searchPlaceholder="Order ID"
            page={currentPageOrders}
            limit={paginationParams.limit}
            columns={columns}
            totalData={totalItemOrders}
            data={dataOrders}
            totalPage={totalPageOrders}
          />
        </div>
      )}
    </DefaultLayout>
  );
};

export default LinkPage;
