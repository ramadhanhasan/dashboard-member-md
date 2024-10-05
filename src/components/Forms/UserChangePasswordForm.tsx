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
import { IUserVerified } from "../../app/(auth)/verified/_interfaces";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ICity,
  IProvince,
  ISubdistrict,
} from "../../app/api/_interfaces/provinces.interface";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "../../lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";
import useVerifiedUserQuery from "../../app/(auth)/verified/_query/useVerifiedUserQuery";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import { IChangePassword } from "../../app/(dashboard)/profile/_interfaces";
import usePutPasswordQuery from "../../app/(dashboard)/profile/_query/usePutPasswordUserQuery";

const formSchema: z.ZodType<IChangePassword> = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    old_password: z.string().min(8),
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmPassword"],
      });
    }
  });

type UserFormValue = z.infer<typeof formSchema>;

export const UserChangePasswordForm = () => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
  });
  const [isChangePasswordAction, setChangePasswordAction] =
    useState<boolean>(false);

  const changePasswordUserMutation = usePutPasswordQuery(() => {
    notification.open({
      message: "Password Kamu sudah sukses terupdate",
      type: "success",
    });
    form.reset();
    setChangePasswordAction(!isChangePasswordAction);
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await changePasswordUserMutation.mutate({
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
      <div className="flex justify-between border-b border-stroke px-7 py-4 dark:border-strokedark">
        <h3 className="font-medium text-black dark:text-white">
          Password Kamu
        </h3>
        {!isChangePasswordAction ? (
          <Button onClick={() => {
            setChangePasswordAction(!isChangePasswordAction)            
          }} className="text-white">
            Ganti Password
          </Button>
        ) : (
          <Button onClick={() => {
            setChangePasswordAction(!isChangePasswordAction)            
          }} variant={"outline"}>
            Batalkan Edit
          </Button>
        )}
      </div>
        {isChangePasswordAction && (
          <div className="p-7">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-2"
            >
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Saat Ini</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan password saat ini"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Baru</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan password baru"
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
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Konfirmasi Password Baru</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Masukkan kembali password baru"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
  
              <div className="mb-5">
                <Button
                  type="submit"
                  value="Submit Data"
                  disabled={loading}
                  className="mt-4 w-full pb-7 pt-7 text-white"
                >
                  Simpan Password
                </Button>
              </div>
            </form>
          </Form>
        </div>
        )}
      
    </>
  );
};
