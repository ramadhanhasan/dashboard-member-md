"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllCommissionHistoryQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { detailPage } from "./_constants";
import { UserCommissionHistoryTable } from "../../../components/Tables/UserCommissionHistoryTables/user-commission-history-table";
import {
  columns,
  FILTER_KEYS,
} from "../../../components/Tables/UserCommissionHistoryTables/columns";
import CardDataStats from "../../../components/CardDataStats";
import { CircleDollarSign, HandCoins } from "lucide-react";
import { formatPrice } from "../../../utils/priceFormatter";
import useGetDetailQuery from "../profile/_query/useGetDetailQuery";
import { useEffect, useState } from "react";
import getDetailRepository from "../profile/_repository/getDetailRepository";
import { IUser } from "../profile/_interfaces";
import Loader from "../../../components/common/Loader";

const CommissionUserPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const { paginationParams, filterParams, sortParams } =
    useQueryParam(FILTER_KEYS);

  const {
    dataCommissionHistory,
    currentPageCommissionHistory,
    totalItemCommissionHistory,
    totalPageCommissionHistory,
    refetechDataCommissionHistory,
    isLoadingCommissionHistory,
  } = useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  const [user, setUser] = useState<Partial<IUser>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getDetailRepository();
        setUser({ ...user });
        setIsLoaded(true);
      } catch (error: any) {
        setIsLoaded(true);
      }
    };

    fetchData().catch((error) => {
      setIsLoaded(true);
    });
  }, [refetechDataCommissionHistory]);

  return (
    <DefaultLayout>
      {!isLoaded ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} />
          {isLoaded && user && (
            <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
              <CardDataStats
                title="Komisi Tersedia (Belum dicairkan)"
                total={formatPrice(user?.balance ?? 0)}
                background="bg-redcard"
              >
                <CircleDollarSign className="font-bold text-redcard" />
              </CardDataStats>

              <CardDataStats
                title="Total Komisi Masuk"
                total={formatPrice(user?.total_commission ?? 0)}
                background="bg-greencard"
              >
                <CircleDollarSign className="text-greencard" />
              </CardDataStats>

              <CardDataStats
                title="Komisi Yang Sudah Dicairkan"
                total={formatPrice(
                  (user?.total_commission || 0) - (user?.balance || 0),
                )}
                background="bg-yellowcard"
              >
                <HandCoins className="font-bold text-yellowcard" />
              </CardDataStats>
            </div>
          )}

          <UserCommissionHistoryTable
            searchKey="notes"
            page={currentPageCommissionHistory}
            limit={paginationParams.limit}
            columns={columns}
            totalData={totalItemCommissionHistory}
            data={dataCommissionHistory}
            totalPage={totalPageCommissionHistory}
          />
        </div>
      )}
    </DefaultLayout>
  );
};

export default CommissionUserPage;
