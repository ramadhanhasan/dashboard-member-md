"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "../../../../../public/images/logo/logo-md.png";
import bcaLogo from "../../../../../public/images/logo/BCA.png";
import useGetDetailOrderQuery from "../../_query/useGetDetailOrderQuery";
import { Button } from "../../../../components/ui/button";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { CheckCircle, ClipboardCopy } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import { formatPrice } from "../../../../utils/priceFormatter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import TimestampConverter from "../../../../utils/dateFormatter";

const CheckoutPage = ({ params }: { params: { order_number: string } }) => {
  const { data, isLoading, isError } = useGetDetailOrderQuery(
    params.order_number,
  );

  const confirmOrder = () => {
    let encodedURL = encodeURIComponent(`
      Hallo Kak, Saya mau konfirmasi pembayaran nomor invoice #${data?.order_number}.

      Nama :
      No Handphone :
      Email :

      Berikut saya kirim bukti transfernya (Foto Bukti TF).`);
    let link = `${process.env.NEXT_PUBLIC_ADMIN_WA_CONFIRM_PAYMENT}?text=${encodedURL}`
    window.open(link, "_blank");
  }

  const confirmHelp = () => {
    let encodedURL = encodeURIComponent(`
      Hallo Kak, aku ada pertanyaan/kendala untuk daftar member Mahir Digital. Mohon Bantuannya`);
    let link = `${process.env.NEXT_PUBLIC_ADMIN_WA_CONFIRM_PAYMENT}?text=${encodedURL}`
    window.open(link, "_blank");
  }

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(data?.payment_account_number || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-screen-lg py-4 md:py-6 2xl:py-10">
      {/* <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark"> */}
      <div className="items-center">
        <div className="bg-gray-50 min-h-screen items-center justify-center px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-100 items-center justify-center p-4">
            <div className="mb-6 rounded border border-yellow-400 bg-yellow-100 p-4 text-yellow-800">
              Silahkan cek Whatsapp & kotak masuk Utama E-Mail
              {data?.user_email}. Apabila tidak ada, silahkan cek kembali di
              bagian Promosi, Update atau Spam.
            </div>
            <Card className="w-full">
              <div className="w-full max-w-4xl">
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
              </div>
              <CardHeader className="text-center">
                <CardTitle className="flex items-center justify-center gap-2 text-2xl font-bold capitalize text-green-600">
                  <CheckCircle className="h-6 w-6" />
                  Order {data?.sub_type.toLowerCase()} Berhasil
                </CardTitle>
                <CardDescription>
                  Selanjutnya, silahkan transfer sesuai nominal (ada 3 kode
                  unik) ke rekening yang tertera di bawah ini :
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold">
                    {formatPrice(data?.total_net_price || 0)}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    No Invoice: #{data?.order_number}
                  </p>
                </div>
                <Separator />
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-bold">Segera Transfer</h3>
                  <p>
                    Silahkan transfer senilai{" "}
                    {formatPrice(data?.total_net_price || 0)} ke nomer rekening
                    dibawah ini :
                  </p>
                  {/* <div className="bg-gray-500 mx-auto max-w-lg rounded-lg p-6 text-center shadow-md"> */}
                  {/* BCA Logo */}
                  <div className="mb-4 flex items-center justify-center p-5">
                    <Image
                      src={bcaLogo}
                      alt="BCA Logo"
                      width={100}
                      height={100}
                    />
                  </div>

                  {/* Bank Account Number */}
                  <h2 className="text-gray-900 mb-2 text-3xl font-bold">
                    {data?.payment_account_number}
                  </h2>

                  {/* Account Holder Name */}
                  <div className="flex flex items-center justify-center">
                    <p className="text-gray-700 text-lg">
                      Atas Nama :{" "}
                      <span className="mr-4 font-bold">
                        {data?.payment_account_name}
                      </span>
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        <ClipboardCopy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="text-center">
                  <h3 className="mb-2 font-semibold">
                    Selesaikan Pembayaran Sebelum
                  </h3>
                  <p className="text-red-600 text-2xl font-bold">
                    {TimestampConverter(data?.expired_at, "DD-MM-YYYY HH:mm")}
                  </p>
                </div>
                <Separator />
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nama Produk/Membership</TableHead>
                        <TableHead className="text-right">Jumlah</TableHead>
                        <TableHead className="text-right">Harga</TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data?.order_details?.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.item_name}</TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatPrice(item.net_price)}
                          </TableCell>
                          <TableCell className="text-right">
                            {formatPrice(item.net_price * item.quantity)}
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-semibold"
                        >
                          Subtotal
                        </TableCell>
                        <TableCell className="text-right">
                          {formatPrice(data?.total_net_price || 0)}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="text-right font-semibold"
                        >
                          Total
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          {formatPrice(data?.total_net_price || 0)}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
                <Separator />
                <p>
                  Setelah transfer,{" "}
                  <span className="font-bold capitalize">
                    {data?.user_name}
                  </span>{" "}
                  bisa langsung konfirmasi melalui Whatsapp Admin, untuk bisa
                  dilakukan verifikasi pembayaran agar bisa masuk ke Website
                  Mahir Digital.
                </p>
                {/* <Link href={"https://wa.me/6285282424450"}> */}
                <Button onClick={confirmOrder} className="w-full p-4 text-white">
                  KONFIRMASI PEMBAYARAN
                </Button>
                {/* </Link> */}
                <p>
                  Kalau butuh bantuan atau ada kendala pembayaran silahkan klik
                  disini ya :
                </p>
                <Button onClick={confirmHelp} className="w-full p-4 text-white">ADMIN SUPPORT</Button>
                <p>
                  Terimakasih sudah menjadi bagian dari Mahir Digital! Semangat
                  belajar & prakteknya, semoga diberi kemudahan dalam menerima
                  ilmu baru ❤️
                </p>
                <br />
                <p className="m-0">Salam Hangat,</p>
                <p className="m-0 text-xl font-bold">Mahir Digital ID</p>
                <p className="m-0 font-bold">#Ngajarin #Nemenin #Nolongin</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CheckoutPage;
