"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs } from "../../../../components/breadcrumbs";
import { Card, CardContent, CardHeader } from "../../../../components/ui/card";
import { AuthContext } from "../../../../global_context/Auth";
import { useContext, useState } from "react";
import { ReferralLinksRelationTable } from "../../../../components/Tables/ReferralLinksRelationTables/referral-link-relation-table";
import { columns } from "../../../../components/Tables/ReferralLinksRelationTables/columns";
import useGetDetailProductQuery from "../_query/useGetDetailProductQuery";
import { Button } from "../../../../components/ui/button";
import Image from "next/image";
import { detailPage } from "../_constants";
import Loader from "../../../../components/common/Loader";
import { useRouter } from "next/navigation";
import { StockTypeEnum } from "../../../../constants/data";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";

const EventPage = ({ params }: { params: { slug: string } }) => {
  const router = useRouter();
  const { userProfile } = useContext(AuthContext);
  const { data, isLoading } = useGetDetailProductQuery(params.slug);
  const [quantity, setQuantity] = useState<number>(1);

  const incrementQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQty = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };
  const phone = userProfile?.phone.startsWith("0")
    ? "62" + userProfile.phone.substring(1)
    : userProfile?.phone;

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
    {
      title: data?.name ?? "Rincian Product",
      titleLink: "Rincian Product",
      link: detailPage.basePath + detailPage.path + data?.slug,
    },
  ];

  const chatProduct = () => {
    let encodedURL = encodeURIComponent(`
      Hallo Kak, aku ada pertanyaan untuk produk ${data?.name}. Mohon Bantuannya`);
    let link = `${process.env.NEXT_PUBLIC_ADMIN_WA_PRODUCT}?text=${encodedURL}`;
    window.open(link, "_blank");
  };

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
                      src={data?.assets[0].url ?? ""}
                      alt="Event Image"
                    />
                  </CardHeader>
                  <CardContent className="pb-5">
                    <p className="truncate-2 mb-2 text-xl font-bold">
                      {data?.name}
                    </p>
                    <div className="mb-4 mt-4 flex flex items-center">
                      <div
                        className="ql-editor text-gray-700 text-base"
                        dangerouslySetInnerHTML={{
                          __html: data?.short_description ?? "",
                        }}
                      />
                    </div>
                    <div className="m-auto text-center">
                      <Label>Jumlah:</Label>
                      <div className="relative m-auto flex max-w-[11rem]">
                        <Button
                          disabled={quantity === 1}
                          onClick={decrementQty}
                          id="decrement-button"
                          data-input-counter-decrement="bedrooms-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border-gray-300 focus:ring-gray-100 dark:focus:ring-gray-700 h-11 rounded-s-lg border p-3 focus:outline-none focus:ring-2"
                        >
                          <svg
                            className="text-gray-900 h-3 w-3 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 2"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M1 1h16"
                            />
                          </svg>
                        </Button>
                        <Input 
                        type="number" 
                        id="quantity-input" 
                        max={data?.max_qty_purchase}
                        min={1}
                        disabled
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        value={quantity}
                        className="bg-gray-50 border-x-0 border-gray-300 text-center text-gray-900 text-md focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 pl-1 pr-1" 
                        required 
                        />
                        <Button
                          onClick={incrementQty}
                          disabled={quantity === data?.max_qty_purchase}
                          id="increment-button"
                          data-input-counter-increment="bedrooms-input"
                          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border-gray-300 focus:ring-gray-100 dark:focus:ring-gray-700 h-11 rounded-e-lg border p-3 focus:outline-none focus:ring-2"
                        >
                          <svg
                            className="text-gray-900 h-3 w-3 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 18 18"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M9 1v16M1 9h16"
                            />
                          </svg>
                        </Button>
                      </div>
                      <p
                        className="text-gray-500 dark:text-gray-400 my-2 text-sm"
                      >
                        Tentukan jumlah yang ingin di beli.
                      </p>
                    </div>
                    <Button
                      className="mb-4 w-full text-white"
                      onClick={() => {
                        router.refresh();
                        router.replace(`/checkout/product/${data?.slug}?quantity=${quantity}`);
                      }}
                      disabled={
                        data?.stock_type === StockTypeEnum.ADJUSTABLE &&
                        data?.stock === 0
                      }
                    >
                      {data?.stock_type === StockTypeEnum.ADJUSTABLE &&
                      data?.stock === 0
                        ? "Stok Habis"
                        : "Beli Sekarang"}
                    </Button>
                    <Button
                      onClick={chatProduct}
                      variant={"outline"}
                      className="mb-4 w-full"
                    >
                      <svg
                        className="mr-2"
                        fill="black"
                        height="15px"
                        width="15px"
                        version="1.1"
                        id="Layer_1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 308 308"
                      >
                        <g id="XMLID_468_">
                          <path
                            id="XMLID_469_"
                            d="M227.904,176.981c-0.6-0.288-23.054-11.345-27.044-12.781c-1.629-0.585-3.374-1.156-5.23-1.156
		c-3.032,0-5.579,1.511-7.563,4.479c-2.243,3.334-9.033,11.271-11.131,13.642c-0.274,0.313-0.648,0.687-0.872,0.687
		c-0.201,0-3.676-1.431-4.728-1.888c-24.087-10.463-42.37-35.624-44.877-39.867c-0.358-0.61-0.373-0.887-0.376-0.887
		c0.088-0.323,0.898-1.135,1.316-1.554c1.223-1.21,2.548-2.805,3.83-4.348c0.607-0.731,1.215-1.463,1.812-2.153
		c1.86-2.164,2.688-3.844,3.648-5.79l0.503-1.011c2.344-4.657,0.342-8.587-0.305-9.856c-0.531-1.062-10.012-23.944-11.02-26.348
		c-2.424-5.801-5.627-8.502-10.078-8.502c-0.413,0,0,0-1.732,0.073c-2.109,0.089-13.594,1.601-18.672,4.802
		c-5.385,3.395-14.495,14.217-14.495,33.249c0,17.129,10.87,33.302,15.537,39.453c0.116,0.155,0.329,0.47,0.638,0.922
		c17.873,26.102,40.154,45.446,62.741,54.469c21.745,8.686,32.042,9.69,37.896,9.69c0.001,0,0.001,0,0.001,0
		c2.46,0,4.429-0.193,6.166-0.364l1.102-0.105c7.512-0.666,24.02-9.22,27.775-19.655c2.958-8.219,3.738-17.199,1.77-20.458
		C233.168,179.508,230.845,178.393,227.904,176.981z"
                          />
                          <path
                            id="XMLID_470_"
                            d="M156.734,0C73.318,0,5.454,67.354,5.454,150.143c0,26.777,7.166,52.988,20.741,75.928L0.212,302.716
		c-0.484,1.429-0.124,3.009,0.933,4.085C1.908,307.58,2.943,308,4,308c0.405,0,0.813-0.061,1.211-0.188l79.92-25.396
		c21.87,11.685,46.588,17.853,71.604,17.853C240.143,300.27,308,232.923,308,150.143C308,67.354,240.143,0,156.734,0z
		 M156.734,268.994c-23.539,0-46.338-6.797-65.936-19.657c-0.659-0.433-1.424-0.655-2.194-0.655c-0.407,0-0.815,0.062-1.212,0.188
		l-40.035,12.726l12.924-38.129c0.418-1.234,0.209-2.595-0.561-3.647c-14.924-20.392-22.813-44.485-22.813-69.677
		c0-65.543,53.754-118.867,119.826-118.867c66.064,0,119.812,53.324,119.812,118.867
		C276.546,215.678,222.799,268.994,156.734,268.994z"
                          />
                        </g>
                      </svg>
                      Chat Admin
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          {data?.referral_links && data?.referral_links.length > 0 && (
            <>
              <h1 className="mt-5 text-lg font-bold">
                AFFILIATE LINK {data?.name}
              </h1>
              <ReferralLinksRelationTable
                searchKey="name"
                page={1}
                limit={10}
                columns={columns}
                totalData={data?.referral_links?.length || 0}
                data={
                  data?.referral_links
                    ? data.referral_links.map((link) => {
                        link.url = `${process.env.NEXT_PUBLIC_URL}/lp?aff=${userProfile?.username}&i=${link.code}&type=${link.type?.toLowerCase()}${link.is_whatsapp_link ? "&whatsapp=" + phone : ""}`;
                        return link;
                      })
                    : []
                }
                totalPage={1}
              />
            </>
          )}
        </div>
      )}
    </DefaultLayout>
  );
};

export default EventPage;
