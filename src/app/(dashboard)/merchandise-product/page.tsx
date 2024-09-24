import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import { ChevronDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import Image from "next/image";
import image from '../../../../public/images/KAOS-MD.jpg';
import { detailPage } from "./_constants";

const CoursePage = () => {
  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="mb-5 p-4 text-center shadow-default dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-9">
          <p className="text-gray-500 dark:text-gray-400 mb-6 text-lg font-normal capitalize sm:px-16 lg:text-xl xl:px-48">
            PRODUK MERCHANDISE Mahir Digital 😊
          </p>
          <Image unoptimized
                  src={image}
                  alt="Logo"
                  className="w-full max-w-2xl m-auto"
                  width={400} height={400}
                >

          </Image>
          <h1 className="underline text-blue-700 mb-4 mt-10 text-xl leading-none tracking-tight dark:text-white md:text-2xl lg:text-3xl">
            Harga Member
          </h1>
          <h1 className="text-blue-700 mb-4 text-2xl font-bold leading-none tracking-tight dark:text-white md:text-3xl lg:text-4xl">
            Rp 65.000
          </h1>
          <h1 className="underline text-blue-700 mb-4 mt-10 text-xl leading-none tracking-tight dark:text-white md:text-2xl lg:text-3xl">
            Harga Umum
          </h1>
          <h1 className="text-blue-700 mb-4 text-2xl font-bold leading-none tracking-tight dark:text-white md:text-3xl lg:text-4xl">
            Rp 75.000
          </h1>

          <h1 className="text-gray-900 mb-4 mt-10 text-xl font-bold leading-none tracking-tight dark:text-white md:text-2xl lg:text-3xl">
            Order Merchandise Bisa Chat Whatsapp Disini
          </h1>
          {/* <div className="text-center"> */}
          <ChevronDown className="w-full" width={50} height={50} />

          <Link
            href={process.env.NEXT_PUBLIC_ADMIN_WA_MERCHANDISE ?? ""}
            target="_blank"
            rel="noopener noreferrer"
            passHref={true}
          >
            <Button className="w-full rounded-lg p-4 text-lg	text-white">
              Order Disini
            </Button>
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default CoursePage;
