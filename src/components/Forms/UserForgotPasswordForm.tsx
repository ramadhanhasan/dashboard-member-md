"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
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
import { IReqForgotPassword } from "../../app/(auth)/forgot-password/_interfaces";
import postForgetPassword from "../../app/(auth)/forgot-password/_repository/postForgetPassword";
import { useRouter } from "next/navigation";

const formSchema: z.ZodType<IReqForgotPassword> = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
});

type FormValue = z.infer<typeof formSchema>;

export default function UserRequestForgotPasswordForm() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: "",
  };
  const form = useForm<FormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: FormValue) => {
    try {
      setErrorMsg(null);
      setLoading(true);
      await postForgetPassword(data);
      router.refresh();
      router.push("/forgot-password/success");
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
          <AlertTitle>Forgot Password Error!</AlertTitle>
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
                    placeholder="Enter your email..."
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
              value="Sign In"
              disabled={loading}
              className="w-full pb-5 pt-5 text-white"
            >
              Send Password Reset Link
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
