"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import useVerifiedUserQuery from "../../app/(auth)/verified/_query/useVerifiedUserQuery";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { IOrder, OrderDetail } from "../../app/checkout/_interfaces";
import { IMembershipProduct } from "../../app/(dashboard)/membership-product/_interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPrice } from "../../utils/priceFormatter";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import useCreateOrderMembershipQuery from "../../app/checkout/_query/useCreateOrderMembershipQuery";
import { deleteCookie } from 'cookies-next'
import { AFF_STORAGE_KEY } from "../../constants/data";

const numberRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema: z.ZodType<IOrder> = z.object({
  user_email: z.string().email({ message: "Enter a valid email address" }),
  user_name: z.string().min(4),
  user_phone: z.string().regex(numberRegex, "invalid phone number"),
  payment_method_name: z.string(),
  payment_service_name: z.optional(z.string()),
  payment_account_number: z.optional(z.string()),
  payment_account_name: z.optional(z.string()),
  total_quantity: z.coerce.number().min(1),
  total_price: z.coerce.number().min(0),
  total_discount_price: z.coerce.number().min(0),
  total_net_price: z.coerce.number().min(0),
  type: z.string(),
  sub_type: z.string(),
  referral_from: z.optional(z.string()),
  funnel: z.optional(z.string()),
});

type FormValue = z.infer<typeof formSchema>;

interface FormProps {
  membership: IMembershipProduct | null;
  orderDetails: OrderDetail[];
  referral_from?: string;
  total_quantity: number;
  total_discount_price: number;
  total_net_price: number;
  total_price: number;
  funnel?: string;
}

export const CheckoutMembershipForm: React.FC<FormProps> = ({
  membership,
  referral_from,
  orderDetails,
  total_quantity,
  total_discount_price,
  total_net_price,
  total_price,
  funnel
}) => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payment_service_name: "BCA",
      payment_method_name: "BANK TRANSFER",
      payment_account_name: "Mahir Digital Asia PT",
      payment_account_number: "7615670898",
      total_discount_price,
      total_net_price,
      total_price,
      total_quantity,
      referral_from: referral_from,
      type: 'SALES',
      sub_type: 'MEMBERSHIP',
      funnel
    },
  });

  const createOrderMutation = useCreateOrderMembershipQuery(() => {});

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      data.items = orderDetails;
      await createOrderMutation.mutate({
        body: data,
      });
      setLoading(false);
    } catch (error) {
      setErrorMsg(error);
      setLoading(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <Alert variant="destructive">
          <AlertTitle>Submit Error!</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Billing Details Form */}
            <div className="lg:col-span-7">
              <Card>
                <CardHeader>
                  <CardTitle>Silahkan Lengkapi Data Dibawah Ini</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="user_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nama Lengkap *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Masukkan nama lengkap"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user_email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alamat Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Masukkan alamat email"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="user_phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>No. Whatsapp *</FormLabel>
                        <FormControl>
                          <Input
                            type="phone"
                            placeholder="Masukkan nomor whatsapp"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-5">
              <Card>
                <CardHeader>
                  <CardTitle>Pesanan Anda</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Product Item */}
                    <div className="flex items-center justify-between border-b pb-4">
                      <div>
                        <p className="text-gray-800 font-medium">
                          {membership?.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Masa Aktif : {membership?.expired_time} Hari
                        </p>
                      </div>
                      <p className="text-gray-800 font-bold">
                        {formatPrice(membership?.net_price ?? 0)}
                      </p>
                    </div>
                    {/* Subtotal and Fees */}
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>{formatPrice(membership?.net_price ?? 0)}</p>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <p>Total</p>
                      <p>{formatPrice(total_net_price)}</p>
                    </div>

                    {/* Coupon Code */}
                    {/* <div className="mt-4">
                          <label className="text-gray-700 block text-sm font-medium">
                            Coupon Code
                          </label>
                          <div className="flex">
                            <Input
                              type="text"
                              placeholder="Enter coupon code"
                              className="border-gray-300 mt-1 flex-1 rounded-l-md border p-2"
                            />
                            <Button className="rounded-none rounded-r-md">
                              Apply
                            </Button>
                          </div>
                        </div> */}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle>Pilih Pembayaran</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* <div> */}
                  <FormField
                    control={form.control}
                    name="payment_service_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            disabled={loading}
                            {...field}
                            defaultValue="BCA"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="BCA" id="r1" />
                              <Label className="mb-0" htmlFor="r1">
                                Bank Transfer - BCA
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* </div> */}
                  {/* <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="payment"
                              className="form-radio"
                            />
                            <span>OVO</span>
                          </label>
                        </div>
                        <div>
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="payment"
                              className="form-radio"
                            />
                            <span>GoPay</span>
                          </label>
                        </div> */}
                  {/* Add other payment options similarly */}
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mb-5">
            <Button
              type="submit"
              value="Submit Data"
              disabled={loading}
              className="mb-5 mt-8 w-full px-5 py-7 text-lg text-white"
            >
              Buat Pesanan {formatPrice(membership?.net_price ?? 0)}{" "}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
