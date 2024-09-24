"use client";

import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { useQueryParam } from "../../../hooks/useQueryParam";
import useGetAllQuery from "./_query/useGetAllMembershipProductQuery";
import { Breadcrumbs } from "../../../components/breadcrumbs";
// import MembershipProduct from "../../../components/MembershipProducts";
import { DefaultControls, DefaultUi, Player, Youtube } from "@vime/react";
import { Check, ChevronDown } from "lucide-react";
import { detailPage } from "./_constants";
import dynamic from "next/dynamic";
import PlayerComponent from "../../../components/Players";

const MembershipProduct = dynamic(() => import('../../../components/MembershipProducts'), { ssr: false });

const CoursePage = () => {
  const { paginationParams, filterParams, sortParams } = useQueryParam();

  const { dataMembershipProduct, currentPageMembershipProduct, totalItemMembershipProduct, totalPageMembershipProduct } =
    useGetAllQuery({ ...paginationParams, filterParams, ...sortParams });

    const breadcrumbItems = [
      { title: detailPage.baseTitle, link: detailPage.basePath },
      { title: detailPage.title, link: detailPage.basePath + detailPage.path }
    ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9 mb-5">
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal capitalize sm:px-16 lg:text-xl xl:px-48">
        PRODUK DIGITAL dengan profit tinggi yang siap kamu pasarkan 😊
        </p>
        <div className="bg-black m-auto mb-5 text-white p-8 rounded-lg shadow-lg  max-w-lg">
        <h2 className="text-xl font-bold mb-4">Kenapa Jual Produk Digital?</h2>
        <ul className="space-y-2">
          <li className="flex text-justify">
            <Check width={24} height={24} />
            <span className="ml-2">Modalnya cenderung kecil</span>
          </li>
          <li className="flex text-justify">
            <Check width={24} height={24} />
            <span className="ml-2">Potensi keuntungannya sangat besar</span>
          </li>
          <li className="flex text-justify">
            <Check width={24} height={24} />
            <span className="ml-2">
              Tanpa repot ke ekspedisi untuk kirim produk
            </span>
          </li>
          <li className="flex text-justify">
            <Check width={24} height={24} />
            <span className="ml-2">
              Bisa dijual ke seluruh dunia, tanpa perlu ongkos kirim
            </span>
          </li>
          <li className="flex text-justify">
            <Check width={24} height={24} />
            <span className="ml-2">Distribusinya sangat cepat</span>
          </li>
        </ul>
      </div>
        <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal sm:px-16 lg:text-xl xl:px-48">
        Bagaimana cara berjualan & menggunakan link affiliasi kamu?
        </p>
        
        <p className="text-yellow-500 font-bold dark:text-gray-400 mb-6 text-lg sm:px-16 lg:text-xl xl:px-48">
        Tonton video dibawah ini ya :
        </p>
        <PlayerComponent
          videoId={process.env.NEXT_PUBLIC_YOUTUBE_ID_MEMBERSHIP ?? ""}
        />
        <h1 className="text-gray-900 mb-4 mt-10 text-xl font-bold leading-none tracking-tight dark:text-white md:text-2xl lg:text-3xl">
          Produk Digital Rekomendasi Kami!
        </h1>
        {/* <div className="text-center"> */}
        <ChevronDown className="w-full" width={50} height={50} />
        {/* </div> */}
      </div>
        <MembershipProduct memberships={dataMembershipProduct} />
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
