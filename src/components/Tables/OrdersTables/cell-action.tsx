"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useQueryParam } from "../../../hooks/useQueryParam";
import { FILTER_KEYS } from "./columns";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { formatPrice } from "../../../utils/priceFormatter";
import { IOrder } from "../../../app/(dashboard)/order/_interfaces";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ORDER_STATUS } from "../../../constants/data";

interface CellActionProps {
  data: IOrder;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push("/checkout/success/" + data.order_number); // Replace with your desired route
  };

  return (
    <>
      <div className="flex flex-col">
        {data.status === ORDER_STATUS.WAITING_PAYMENT ? (
          <Button variant="outline" onClick={handleRedirect} size="lg">
            Lihat Rincian
          </Button>
        ) : (
          <Dialog>
            <DialogTrigger>
              <Button variant="outline" size="lg">
                Lihat Rincian
              </Button>
            </DialogTrigger>

            <DialogContent className="mx-auto max-w-md rounded-lg bg-white p-6">
              <DialogTitle className="text-xl font-bold">
                {data.order_number}
              </DialogTitle>
              <DialogDescription className="text-gray-500 mb-4">
                Ini adalah list pembelian Anda:
              </DialogDescription>

              <ul className="space-y-4">
                {data.order_details?.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <span className="font-medium">
                      {item.item_name} (x{item.quantity})
                    </span>
                    <span className="text-gray-600">
                      {formatPrice(
                        item.net_price * item.quantity || 0,
                        "IDR",
                        "id-ID",
                      )}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center justify-between text-lg font-bold">
                <span>Total:</span>
                <span>
                  {formatPrice(data.total_net_price || 0, "IDR", "id-ID")}
                </span>
              </div>

              <DialogClose className="mt-4 rounded px-4 py-2">
                Tutup
              </DialogClose>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </>
  );
};
