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
import { useRouter } from "next/navigation";
import { IOrder, OrderDetail } from "../../app/checkout/_interfaces";
import { IMembershipProduct } from "../../app/(dashboard)/membership-product/_interfaces";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { formatPrice } from "../../utils/priceFormatter";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import useCreateOrderMembershipQuery from "../../app/checkout/_query/useCreateOrderMembershipQuery";
import useGetDetailQuery from "../../app/(dashboard)/profile/_query/useGetDetailQuery";
import { IUser } from "../../app/(dashboard)/profile/_interfaces";
import Image from "next/image";
import { ORDER_SUB_TYPE } from "../../constants/data";
import { IProduct } from "../../app/(dashboard)/physical-product/_interfaces";

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
  product: IProduct | null;
  orderDetails: OrderDetail[];
  referral_from?: string;
  total_quantity: number;
  total_discount_price: number;
  total_net_price: number;
  total_price: number;
  funnel?: string;
  user: IUser | null;
}

export const CheckoutProductForm: React.FC<FormProps> = ({
  product,
  referral_from,
  orderDetails,
  total_quantity,
  total_discount_price,
  total_net_price,
  total_price,
  funnel,
  user,
}) => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [snapToken, setSnapToken] = useState<string | null>(null);
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
      referral_from,
      type: "SALES",
      sub_type: ORDER_SUB_TYPE.MEMBERSHIP,
      funnel,
      user_email: user?.email,
      user_phone: user?.phone,
      user_name: user?.name,
    },
  });

  const createOrderMutation = useCreateOrderMembershipQuery(() => {});

  useEffect(() => {
    // const script = document.createElement('script');
    // script.src = 'https://app.sandbox.midtrans.com/snap/snap.js';
    // script.async = true;
    // document.body.appendChild(script);
    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);

  // const { mutateAsync, isError, error } = useCreateOrderMembershipQuery();

  const onSubmit = async (data: FormValue) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      data.items = orderDetails;
      await createOrderMutation.mutate({
        body: data,
      });
      // const createOrderMutation = await mutateAsync({body : data})
      // router.refresh()
      // router
      // console.log(createOrderMutation);
      // if (createOrderMutation?.snap) {
      //   setSnapToken(createOrderMutation.snap?.token);
      //   window.snap.pay(createOrderMutation.snap?.token);
      // }
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
            <div className="lg:col-span-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>Silahkan Lengkapi Data Dibawah Ini</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
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
                            disabled={loading || !!user}
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
                            disabled={loading || !!user}
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
                            disabled={loading || !!user}
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
            <div className="lg:col-span-6">
              <Card>
                <CardHeader className="p-4">
                  <CardTitle>Pesanan Kamu</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="mb-4 flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        className="w-12 rounded-md lg:w-18"
                        width={400}
                        height={200}
                        src={product?.assets[0].url ?? ""}
                        alt="Membership Image"
                      />
                      <div className="mr-2">
                        <p className="font-medium">{orderDetails[0].quantity != 1 ? `${total_quantity} x `  : ''} {product?.name}</p>
                        {product?.price != product?.net_price && (
                          <p className="text-gray-500 text-sm line-through">
                            {formatPrice(product?.price ?? 0)}
                          </p>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-800 font-bold">
                      {formatPrice(product?.net_price ?? 0)}
                    </p>
                  </div>
                  <div className="space-y-4">
                    {/* Product Item */}
                    {/* Subtotal and Fees */}
                    <div className="flex justify-between">
                      <p>Subtotal</p>
                      <p>{formatPrice((product?.net_price ?? 0) * total_quantity)}</p>
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
                <CardHeader className="p-4">
                  <CardTitle>Pilih Pembayaran</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
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
              {!loading
                ? `Buat Pesanan ${formatPrice(total_net_price)} `
                : "Pesanan diproses..."}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
