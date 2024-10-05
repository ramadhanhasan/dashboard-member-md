"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AuthContext } from "../../global_context/Auth";
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
import Link from "next/link";
import postSignIn from "../../app/(auth)/login/_repository/postSignin";
import { IAuth } from "../../app/(auth)/login/_interfaces";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const formSchema: z.ZodType<IAuth> = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string(),
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const { login } = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      setErrorMsg(null);
      setLoading(true);
      const res = await postSignIn(data);
      await login(res);
      setTimeout(() => {
        //test
      }, 2000);
    } catch (error: any) {
      setErrorMsg(error.error);
      form.reset();
      setLoading(false);
    }
  };

  return (
    <>
      {errorMsg && (
        <Alert variant="destructive">
          <AlertTitle>Login Error!</AlertTitle>
          <AlertDescription>
            {errorMsg}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Masukkan Email Kamu"
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
                <div className="flex justify-between">

                <FormLabel>Password</FormLabel>
                <Link href={'/forgot-password'}>Lupa Password ?</Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Masukkan Password Kamu"
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
              value="Login"
              disabled={loading}
              className="w-full pb-5 pt-5 text-white"
            >
              Login
            </Button>
          </div>

          <div className="mt-6 text-center">
            <p>
              Belum punya akun mahir digital?{" "}
              <Link href="https://mahirdigital.id" className="text-primary">
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </>
  );
}
