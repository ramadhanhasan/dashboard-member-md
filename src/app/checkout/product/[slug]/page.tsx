"use client";

import Link from "next/link";
import { OrderDetail } from "../../_interfaces";
import { getCookie } from "cookies-next";
import {
  FUNNEL_STORAGE_KEY,
} from "../../../../constants/data";
import { AuthContext } from "../../../../global_context/Auth";
import { useContext, useEffect, useState } from "react";
import DefaultLayout from "../../../../components/Layouts/DefaultLayout";
import useGetDetailQuery from "../../../(dashboard)/profile/_query/useGetDetailQuery";
import Loader from "../../../../components/common/Loader";
import useGetDetailProductQuery from "../../../(dashboard)/physical-product/_query/useGetDetailProductQuery";
import { CheckoutProductForm } from "../../../../components/Forms/CheckoutProductForm";
import { ArrowLeft } from "lucide-react";
import { useSearchParams } from 'next/navigation'

const ProductCheckoutPage = ({ params }: { params: { slug: string } }) => {
  const { isAuth } = useContext(AuthContext);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchParams = useSearchParams()
  const quantity = searchParams.get('quantity');
  
  const { data, isLoading, isError } = useGetDetailProductQuery(params.slug);
  const total_quantity = parseInt(quantity ?? '1');
  const total_discount_price = (data?.price || 0) - (data?.net_price || 0);
  const total_net_price = (data?.net_price ?? 0) * total_quantity;
  const total_price = (data?.price ?? 0) * total_quantity;
  const order_details: OrderDetail[] = [
    {
      item_name: data?.name || "",
      other_id: data?.id,
      membership_id: data?.id,
      type: "PRODUCT",
      discount_price: total_discount_price,
      price: data?.price ?? 0,
      net_price: data?.net_price ?? 0,
      total_price: total_price,
      total_discount_price: total_discount_price,
      total_net_price: total_net_price,
      quantity: parseInt(quantity ?? '1'),
      weight: 0,
      base_price: 0,
    },
  ];
  const funnel = getCookie(FUNNEL_STORAGE_KEY);

  const user = useGetDetailQuery();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuth) await user.refetchData();
        setIsLoaded(true);
      } catch (error: any) {
        setIsLoaded(true);
      }
    };

    fetchData().catch((error) => {
      setIsLoaded(true);
    });
  }, [isAuth, user.refetchData]);

  return (
    <>
      {!isLoaded && <Loader />}
      {isAuth && isLoaded && (
        <DefaultLayout>
          <div className="items-center">
            <div className="bg-gray-50 flex items-center justify-center">
              <div className="w-full max-w-6xl space-y-8">
                {/* Header Section */}
                <div className="mb-4 mt-4 text-center">
                  <h1 className="text-gray-800 text-3xl font-bold">
                    Checkout Produk Dropship
                  </h1>
                </div>
                <Link className="flex" href={"/physical-product/"+data?.slug}><ArrowLeft />Kembali ke detail produk</Link>
                {!isLoading && !isError && (
                  <CheckoutProductForm
                    product={data}
                    orderDetails={order_details}
                    total_discount_price={total_discount_price}
                    total_net_price={total_net_price}
                    total_price={total_price}
                    total_quantity={total_quantity}
                    referral_from={undefined}
                    funnel={funnel}
                    user={user.data}
                  />
                )}
              </div>
            </div>
          </div>
        </DefaultLayout>
      )}
    </>
  );
};

export default ProductCheckoutPage;
