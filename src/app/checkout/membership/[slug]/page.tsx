"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/images/logo/logo-md.png";
import useGetDetailMembershipQuery from "../../_query/useGetDetailMembershipQuery";
import { CheckoutMembershipForm } from "../../../../components/Forms/CheckoutMembershipForm";
import { OrderDetail } from "../../_interfaces";
import { getCookie } from 'cookies-next'
import { AFF_STORAGE_KEY, FUNNEL_STORAGE_KEY } from "../../../../constants/data";

const SuccessCheckoutPage = ({ params }: { params: { slug: string } }) => {
  const { data, isLoading, isError } = useGetDetailMembershipQuery(params.slug);
  const total_quantity = 1;
  const total_discount_price = (data?.net_price || 0) - (data?.price || 0);
  const total_net_price = (data?.net_price ?? 0) * total_quantity;
  const total_price = (data?.price ?? 0) * total_quantity;
  const order_details: OrderDetail[] = [
    {
      item_name: data?.name || "",
      other_id: data?.id,
      membership_id: data?.id,
      type: "MEMBERSHIP",
      discount_price: total_discount_price,
      price: data?.price ?? 0,
      net_price: data?.net_price ?? 0,
      total_price: total_price,
      total_discount_price: total_discount_price,
      total_net_price: total_net_price,
      quantity: 1,
      weight: 0,
      base_price: 0,
    },
  ];
  const referral_from = getCookie(AFF_STORAGE_KEY);
  const funnel = getCookie(FUNNEL_STORAGE_KEY);


  return (
    <div className="mx-auto max-w-screen-lg p-4 md:p-6 2xl:p-10">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="items-center">
          <div className="bg-gray-50 flex min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl space-y-8">
              {/* Header Section */}
              <div className="w-full xl:block">
                <div className="pt-10 text-center">
                  <Link className="mb-5.5 inline-block" href="/">
                    <Image
                      className="hidden dark:block"
                      src={logo}
                      alt="Logo"
                      width={176}
                      height={32}
                    />
                    <Image
                      className="dark:hidden"
                      src={logo}
                      alt="Logo"
                      width={176}
                      height={32}
                    />
                  </Link>
                </div>
              </div>
              <div className="mb-8 text-center">
                <h1 className="text-gray-800 text-3xl font-bold">
                  Checkout Product
                </h1>
                <p className="text-gray-600 mt-2">
                  Selesaikan pembelian produk dengan mudah!
                </p>
              </div>
              {!isLoading && !isError && (
                <CheckoutMembershipForm
                  membership={data}
                  orderDetails={order_details}
                  total_discount_price={total_discount_price}
                  total_net_price={total_net_price}
                  total_price={total_price}
                  total_quantity={total_quantity}
                  referral_from={referral_from}
                  funnel={funnel}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessCheckoutPage;
