"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/images/logo/logo-md.png";
import useGetDetailMembershipQuery from "../../_query/useGetDetailMembershipQuery";
import { CheckoutMembershipForm } from "../../../../components/Forms/CheckoutMembershipForm";
import { OrderDetail } from "../../_interfaces";
import { getCookie } from "cookies-next";
import {
  AFF_STORAGE_KEY,
  FUNNEL_STORAGE_KEY,
  ORDER_SUB_TYPE,
} from "../../../../constants/data";
import { AuthContext } from "../../../../global_context/Auth";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../../../components/Layouts/DefaultLayout";
import useGetDetailQuery from "../../../(dashboard)/profile/_query/useGetDetailQuery";
import useGetDetailEventQuery from "../../_query/useGetDetailEventQuery";
import { CheckoutEventForm } from "../../../../components/Forms/CheckoutEventForm";
import Loader from "../../../../components/common/Loader";

const EventCheckoutPage = ({ params }: { params: { slug: string } }) => {
  const { isAuth } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { data, isLoading, isError } = useGetDetailEventQuery(params.slug);
  const total_quantity = 1;
  const [totalDiscountPrice, setTotalDiscountPrice] = useState<number>((data?.price || 0) - (data?.net_price || 0) * total_quantity);
  const [totalNetPrice, setTotalNetPrice] = useState<number>((data?.net_price ?? 0) * total_quantity);
  const [totalPrice, setTotalPrice] = useState<number>((data?.price ?? 0) * total_quantity);
  const order_details: OrderDetail[] = [
    {
      item_name: data?.name || "",
      other_id: data?.id,
      event_id: data?.id,
      type: ORDER_SUB_TYPE.EVENT,
      discount_price: totalDiscountPrice,
      price: data?.price ?? 0,
      net_price: data?.net_price ?? 0,
      total_price: totalPrice,
      total_discount_price: totalDiscountPrice,
      total_net_price: totalNetPrice,
      quantity: 1,
      weight: 0,
      base_price: 0,
      image_url: data?.image_url
    },
  ];
  
  const user = useGetDetailQuery();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth && data) {
          await user.refetchData();
        } else if (data) {
          data.net_price = data?.consumer_net_price;
          data.price = data?.consumer_price;
          await setTotalDiscountPrice((data?.price || 0) - (data?.net_price || 0));
          await setTotalNetPrice((data?.net_price ?? 0) * total_quantity);
          await setTotalPrice((data?.price ?? 0) * total_quantity);
          
        }

        await setIsLoaded(true);
      } catch (error: any) {
        setIsLoaded(true);
      }
    };

    if (data) {
      fetchData().catch((error) => {
        setIsLoaded(true);
      });
    }
  }, [isAuth, user.refetchData, data, totalDiscountPrice, totalNetPrice, totalPrice]);

  return (
    <>
      {!isLoaded && (
        <Loader />
      )}
      {isAuth && isLoaded && (
        <DefaultLayout>
          {/* <div className="mx-auto max-w-screen-lg p-4 md:p-6 2xl:p-10"> */}
            {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"> */}
              <div className="items-center">
                <div className="bg-gray-50 flex items-center justify-center">
                  <div className="w-full max-w-6xl space-y-8">
                    {/* Header Section */}
                    <div className="mb-4 mt-4 text-center">
                      <h1 className="text-gray-800 text-3xl font-bold">
                        Checkout Event
                      </h1>
                    </div>
                    {!isLoading && !isError && (
                      <CheckoutEventForm
                        event={data}
                        orderDetails={order_details}
                        total_discount_price={totalDiscountPrice}
                        total_net_price={totalNetPrice}
                        total_price={totalPrice}
                        total_quantity={total_quantity}
                        referral_from={undefined}
                        funnel={undefined}
                        user={user.data}
                      />
                    )}
                  </div>
                </div>
              </div>
            {/* </div> */}
          {/* </div> */}
        </DefaultLayout>
      )}
      {!isAuth && isLoaded && (
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
                      Checkout Event
                    </h1>
                    <p className="text-gray-600 mt-2">
                      Selesaikan pendaftaran event dengan mudah!
                    </p>
                  </div>
                  {!isLoading && !isError && (
                    <CheckoutEventForm
                      event={data}
                      orderDetails={order_details}
                      total_discount_price={totalDiscountPrice}
                      total_net_price={totalNetPrice}
                      total_price={totalPrice}
                      total_quantity={total_quantity}
                      referral_from={undefined}
                      funnel={undefined}
                      user={null}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EventCheckoutPage;
