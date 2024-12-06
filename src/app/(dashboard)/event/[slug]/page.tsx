"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import useGetDetailQuery from "./_query/useGetDetailQuery";
import { Breadcrumbs } from "../../../../components/breadcrumbs";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import {
  Calendar,
  Circle,
  CircleCheck,
  LinkIcon,
  LockOpen,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TimestampConverter from "../../../../utils/dateFormatter";
import { formatPrice } from "../../../../utils/priceFormatter";
import Image from "next/image";
import { detailPage } from "../_constants";
import Loader from "../../../../components/common/Loader";

const EventPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { data, isLoading, isError, refetchData } = useGetDetailQuery(
    params.slug,
  );

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
    {
      title: data?.name ?? "Rincian Event",
      titleLink: "Rincian Event",
      link: detailPage.basePath + detailPage.path + data?.slug,
    },
  ];

  return (
    <DefaultLayout>
      {isLoading ? (
        <Loader />
      ) : (
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
                      className="mb-4 w-full rounded-md"
                      width={400}
                      height={200}
                      src={data?.image_url ?? ""}
                      alt="Event Image"
                    />
                  </CardHeader>
                  <CardContent className="pb-0">
                    {/* <div className="px-6 pb-2"> */}
                    <p className="font-bold capitalize">
                      {data?.implementation}
                    </p>
                    <p className="mr-2 text-xs">
                      <Calendar width={20} className="grey mr-2 inline" />
                      {TimestampConverter(
                        data?.start_date,
                        "DD-MM-YY HH:mm",
                      )} -{" "}
                      {TimestampConverter(data?.end_date, "DD-MM-YY HH:mm")}
                    </p>
                    {data?.implementation === "offline" ? (
                      <p className="mr-2 text-xs">
                        <MapPin width={20} className="grey mr-2 inline" />
                        {data?.location}
                      </p>
                    ) : (
                      <p className="mr-2 text-xs">
                        <LinkIcon width={20} className="grey mr-2 inline" />
                        {data?.location}
                      </p>
                    )}
                    <div className="text-gray-500 bold mb-4 mt-4 flex items-center">
                      {data?.price != data?.net_price && (
                        <div className="mr-2 text-sm text-red line-through">
                          {data?.price !== 0
                            ? formatPrice(data?.price || 0, "IDR", "id-ID")
                            : "GRATIS"}
                        </div>
                      )}
                      {data?.net_price !== 0
                        ? formatPrice(data?.net_price || 0, "IDR", "id-ID")
                        : "GRATIS"}
                    </div>

                    {!data?.is_finished && (
                      <Button
                        className="mb-2 w-full text-white"
                        onClick={() => {
                          router.refresh();
                          router.replace(`/checkout/event/${data?.slug}`);
                        }}
                        disabled={!!data?.event_attendances?.length}
                      >
                        {!!data?.event_attendances?.length
                          ? `Sudah Terdaftar (${data.event_attendances[0].entry_code})`
                          : "Daftar Sekarang"}
                      </Button>
                    )}
                    {data?.button_text &&
                      data?.button_text != "" &&
                      data?.link &&
                      data.link != "" && (
                        <>
                          <Link
                            href={
                              data.link ??
                              process.env.NEXT_PUBLIC_ADMIN_WA_EVENT
                            }
                            passHref={true}
                          >
                            <Button
                              variant={data.is_finished ? "default" : "outline"}
                              className="mb-4 w-full"
                            >
                              {data.button_text}
                            </Button>
                          </Link>
                        </>
                      )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default EventPage;
