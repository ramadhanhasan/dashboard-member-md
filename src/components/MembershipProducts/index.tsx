"use client";

import {
  Link,
  Timer,
} from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { formatPrice } from "../../utils/priceFormatter";
import { IMembershipProduct } from "../../app/(dashboard)/membership-product/_interfaces";
import { useContext } from "react";
import { AuthContext } from "../../global_context/Auth";
import Image from "next/image";

const MembershipProduct = ({
  memberships,
}: {
  memberships: IMembershipProduct[];
}) => {
  const { userProfile, isAuth } = useContext(AuthContext)
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {memberships.map((membership: IMembershipProduct) => (
        <a
          key={membership.id}
          onClick={() => {
            router.push(`membership-product/${membership.slug}`);
          }}
          className="max-w-sm transform cursor-pointer overflow-hidden rounded bg-white text-left shadow-lg transition-transform duration-300 hover:scale-105 focus:outline-none"
        >
          <Image
            width={400} height={200}
            className="w-full"
            src={membership.image_url ?? "https://via.placeholder.com/400x200"}
            alt={membership.name}
          />
          <div className="px-6 py-1">
            <p className="truncate-2 mb-2 text-xl font-bold">
              {membership.name}
            </p>
            <div className="mt-4 mb-4 flex items-center flex">
              <div className="flex-1">
                <p>Harga Jual</p>
                <p>Komisi</p>
                <p>Profit</p>
              </div>
              <div className="flex-1 text-blue-700 font-bold">
                <div className="flex">
                {membership.price != membership.net_price && (
                <div className="mr-2 text-sm text-red line-through">
                  {formatPrice(membership.price, "IDR", "id-ID")}
                </div>
              )}
              {formatPrice(membership.net_price, "IDR", "id-ID")}
                </div>
                <p> {userProfile?.commission} % </p>
                <p>{formatPrice(membership.net_price * (userProfile?.commission || 0) / 100)}</p>
              </div>
            </div>
            <div
              className="ql-editor truncate-3 text-gray-700 text-base"
              dangerouslySetInnerHTML={{ __html: membership.description ?? "" }}
            />
            <div className="text-gray-500 mt-4 flex items-center text-sm">
              <div className="ml-4 flex items-center rounded-lg bg-slate-200 px-2 py-1">
                <Timer />
                {membership.expired_time} hari aktif
              </div>
            </div>
          </div>
          <div className="rounded-full px-6 py-4">
            <Button className="w-full text-white">
              Lihat Detail Membership
            </Button>
          </div>
        </a>
      ))}
    </div>
  );
};

export default MembershipProduct;
