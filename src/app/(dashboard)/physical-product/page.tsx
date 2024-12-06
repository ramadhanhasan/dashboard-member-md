"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllProductQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import Event from "../../../components/Events";
import MembershipProduct from "../../../components/MembershipProducts";
import { DefaultControls, DefaultUi, Player, Youtube } from "@vime/react";
import { Check, ChevronDown } from "lucide-react";
import Product from "../../../components/Products";
import { detailPage } from "./_constants";
import Loader from "../../../components/common/Loader";

const CoursePage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam();

  paginationParams.limit = 100;

  const { dataProduct, isLoadingProduct } = useGetAllQuery({
    ...paginationParams,
    filterParams,
    ...sortParams,
  });

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  return (
    <DefaultLayout>
      {isLoadingProduct ? (
        <Loader />
      ) : (
        <div className="mx-auto max-w-7xl">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mb-5 p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal capitalize sm:px-16 lg:text-xl xl:px-48">
              PRODUK FISIK dengan profit tinggi yang siap kamu pasarkan 😊
            </p>
            <div className="m-auto mb-5 max-w-lg rounded-lg bg-black p-8 text-white  shadow-lg">
              <h2 className="mb-4 text-xl font-bold">
                Fasilitas dan benefit :
              </h2>
              <ul className="space-y-2">
                <li className="flex text-justify">
                  <Check width={24} height={24} />
                  <span className="ml-2">
                    Bisa dropship (tanpa repot stok dan kirim produk)
                  </span>
                </li>
                <li className="flex text-justify">
                  <Check width={24} height={24} />
                  <span className="ml-2">Margin/ keuntungan besar</span>
                </li>
                <li className="flex text-justify">
                  <Check width={24} height={24} />
                  <span className="ml-2">
                    Tools marketing lengkap dan GRATIS (konten & landingpage)
                  </span>
                </li>
                <li className="flex text-justify">
                  <Check width={24} height={24} />
                  <span className="ml-2">Product knowledge lengkap</span>
                </li>
                <li className="flex text-justify">
                  <Check width={24} height={24} />
                  <span className="ml-2">Supplier tangan pertama</span>
                </li>
              </ul>
            </div>
            {/* <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal sm:px-16 lg:text-xl xl:px-48">
        Bagaimana cara berjualan & menggunakan link affiliasi kamu?
        </p>
        
        <p className="text-yellow-500 font-bold dark:text-gray-400 mb-6 text-lg sm:px-16 lg:text-xl xl:px-48">
        Tonton video dibawah ini ya :
        </p>
        <Player theme="dark">
          <Youtube
            videoId={process.env.NEXT_PUBLIC_YOUTUBE_ID_MEMBERSHIP || ""}
          />
          <DefaultUi noControls>
            <DefaultControls hideOnMouseLeave activeDuration={2000} />
          </DefaultUi>
        </Player> */}

            <h1 className="text-gray-900 mb-4 mt-10 text-xl font-bold leading-none tracking-tight dark:text-white md:text-2xl lg:text-3xl">
              Rekomendasi Produk Winning! (Sudah ditest)
            </h1>
            {/* <div className="text-center"> */}
            <ChevronDown className="w-full" width={50} height={50} />
            {/* </div> */}
          </div>
          <Product products={dataProduct} />
        </div>
      )}
    </DefaultLayout>
  );
};

export default CoursePage;
