"use client";

import {
  Link,
  Timer,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../utils/priceFormatter";
import { useContext } from "react";
import { AuthContext } from "../../global_context/Auth";
import { IProduct } from "../../app/(dashboard)/physical-product/_interfaces";
import Image from "next/image";

const Product = ({
  products,
}: {
  products: IProduct[];
}) => {
  const { userProfile, isAuth } = useContext(AuthContext)
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product: IProduct) => (
        <a
          key={product.id}
          onClick={() => {
            router.push(`physical-product/${product.slug}`);
          }}
          className="max-w-sm transform cursor-pointer overflow-hidden rounded bg-white text-left shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <Image
            width={400} height={200}
            className="w-full"
            src={product.assets[0].url ?? "https://via.placeholder.com/400x200"}
            alt={product.name}
          />
          <div className="px-6 py-1">
            <p className="truncate-2 mb-2 text-xl font-bold">
              {product.name}
            </p>
            <div className="mt-4 mb-4 flex items-center flex">
              <div className="flex-1">
                <p>HPP(Modal)</p>
                <p>Harga Jual</p>
                <p>Profit</p>
              </div>
              <div className="flex-1 text-blue-700 font-bold">
              <p> {formatPrice(product.base_price)} </p>
                
                <div className="flex">
                {product.price != product.net_price && (
                <div className="mr-2 text-sm text-red line-through">
                  {formatPrice(product.price, "IDR", "id-ID")}
                </div>
              )}
              {formatPrice(product.net_price, "IDR", "id-ID")}
                </div>
                <p>{formatPrice(product.net_price - product.base_price)}</p>
              </div>
            </div>
            <div
              className="ql-editor truncate-3 text-gray-700 text-base"
              dangerouslySetInnerHTML={{ __html: product.description ?? "" }}
            />
            {/* <div className="text-gray-500 mt-4 flex items-center text-sm">
              <div className="flex items-center rounded-lg bg-slate-200 px-2 py-1">
                <Link />` {product.referral_links?.length ?? 0} link affiliasi`
              </div>
            </div> */}
          </div>
          <div className="rounded-full px-6 py-4">
            <Button className="w-full text-white">
              Lihat Detail Product
            </Button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Product;
