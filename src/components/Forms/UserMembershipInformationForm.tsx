"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  ICity,
  ISubdistrict,
} from "../../app/api/_interfaces/provinces.interface";
import { useRouter } from "next/navigation";
import { IUser } from "../../app/(dashboard)/profile/_interfaces";
import TimestampConverter from "../../utils/dateFormatter";
import { formatPrice } from "../../utils/priceFormatter";

interface UserMembershipInformationFormProps {
  initialData: Partial<IUser>;
}

export const UserMembershipInformationForm: React.FC<
  UserMembershipInformationFormProps
> = ({ initialData }) => {
  const form = useForm({
    defaultValues: {
      username: initialData.username,
      referral_code: initialData.refferral_code,
      email: initialData.email,
      expired_time: initialData.expired_time,
      balance: initialData.balance,
      total_commission: initialData.total_commission
    },
  });

  return (
    <>
      <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Informasi Membership
        </h3>
      </div>
      <div className="p-7">
        <Form {...form}>
          <form className="w-full space-y-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-0">
                    Username / Kode Referral
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      disabled={true}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-0">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      disabled
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormLabel className="pt-5">Masa Aktif Membership</FormLabel>
            <Input
              type="text"
              placeholder="Enter your email"
              disabled
              value={TimestampConverter(initialData.expired_time)}
            />

            <FormLabel className="pt-5">Affilisi Dari</FormLabel>
            <Input
              type="text"
              disabled
              value={initialData.referral_from_user?.name ?? ""}
            />

            <FormLabel className="pt-5">Total Komisi Masuk</FormLabel>
            <Input
              type="text"
              disabled
              value={formatPrice(initialData.total_commission || 0)}
            />

            <FormLabel className="pt-5">Komisi Yang Sudah Dicairkan            </FormLabel>
            <Input
              type="text"
              disabled
              value={formatPrice((initialData.total_commission || 0) - (initialData.balance || 0))}
            />

            <FormLabel className="pt-5">Komisi Tersedia (Belum dicairkan)            </FormLabel>
            <Input type="text" disabled value={formatPrice(initialData.balance || 0)} />
          </form>
        </Form>
      </div>
    </>
  );
};
