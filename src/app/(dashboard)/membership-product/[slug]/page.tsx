"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs } from "../../../../components/breadcrumbs";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import {
  Link,
  Timer,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../../../utils/priceFormatter";
import useGetDetailMembershipProductQuery from "../_query/useGetDetailMembershipProductQuery";
import { AuthContext } from "../../../../global_context/Auth";
import { useContext } from "react";
import { ReferralLinksRelationTable } from "../../../../components/Tables/ReferralLinksRelationTables/referral-link-relation-table";
import { columns } from "../../../../components/Tables/ReferralLinksRelationTables/columns";
import Image from "next/image";
import { detailPage } from "../_constants";

const EventPage = ({ params }: { params: { slug: string } }) => {
  const { userProfile, isAuth } = useContext(AuthContext);
  const router = useRouter();
  const { data, isLoading, isError, refetchData } =
    useGetDetailMembershipProductQuery(params.slug);

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
    {
      title: data?.name ?? "Rincian Membership Product",
      titleLink: "Rincian Membership Product",
      link: detailPage.basePath + detailPage.path + data?.slug,
    },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex flex-col flex-col-reverse lg:flex-row lg:space-x-8">
          {/* Course Details Section */}
          <div className="mt-4 flex-1 space-y-6">
            <div
              className="ql-editor custom-list"
              dangerouslySetInnerHTML={{ __html: data?.description ?? "" }}
            ></div>
          </div>
          <div className="top-8 flex-shrink-0 lg:w-1/3">
            <div className="sticky top-10">
              <Card className="bg-white shadow-lg">
                <CardHeader className="p-0">
                  <Image
                    width={400} height={200}
                    className="mb-4 w-full rounded-md"
                    src={data?.image_url ?? "https://placehold.co/400x200"}
                    alt="Event Image"
                  />
                </CardHeader>
                <CardContent className="pb-5">
                  <p className="truncate-2 mb-2 text-xl font-bold">
                    {data?.name}
                  </p>
                  <div className="mb-4 mt-4 flex flex items-center">
                    <div className="flex-1">
                      <p>Harga Jual</p>
                      <p>Komisi</p>
                      <p>Profit</p>
                    </div>
                    <div className="flex-1 font-bold text-blue-700">
                      <div className="flex">
                        {data?.price != data?.net_price && (
                          <div className="mr-2 text-sm text-red line-through">
                            {formatPrice(data?.price || 0, "IDR", "id-ID")}
                          </div>
                        )}
                        {formatPrice(data?.net_price || 0, "IDR", "id-ID")}
                      </div>
                      <p> {userProfile?.commission} % </p>
                      <p>
                        {formatPrice(
                          ((data?.net_price || 0) *
                            (userProfile?.commission || 0)) /
                            100,
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-500 mt-4 flex items-center text-sm">
                    <div className="flex items-center rounded-lg bg-slate-200 px-2 py-1">
                      <Link />` {data?.referral_links?.length ?? 0} link
                      affiliasi`
                    </div>
                    <div className="ml-4 flex items-center rounded-lg bg-slate-200 px-2 py-1">
                      <Timer />
                      {data?.expired_time} hari aktif
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <h1 className="text-lg font-bold mt-5">AFFILIATE LINK {data?.name}</h1>
        <ReferralLinksRelationTable
          searchKey="name"
          page={1}
          limit={10}
          columns={columns}
          totalData={data?.referral_links?.length || 0}
          data={data?.referral_links || []}
          totalPage={1}
        />
      </div>
    </DefaultLayout>
  );
};

export default EventPage;
