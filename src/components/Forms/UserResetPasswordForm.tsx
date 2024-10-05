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
import { IResetPassword } from "../../app/(auth)/reset-password/_interfaces";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import useResetPasswordUserQuery from "../../app/(auth)/reset-password/_query/useResetPasswordUserQuery";

const formSchema: z.ZodType<IResetPassword> = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    id: z.string(),
    forgotten_code: z.string()
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

type UserResetPasswordFormValue = z.infer<typeof formSchema>;

interface dataType {
  initialData: Partial<IResetPassword>;
}

export const UserResetPasswordForm: React.FC<dataType> = ({
  initialData,
}) => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<IResetPassword> = {id: initialData.id, forgotten_code: initialData.forgotten_code};
  const router = useRouter();
  const form = useForm<UserResetPasswordFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const resetPasswordUserMutation = useResetPasswordUserQuery(() => {
    notification.open({
      message: 'Your password has been reset',
      type: 'success',
      description: 'page will move automatically to the sign in page in 3 seconds'
    })
    setTimeout(() => {
      router.refresh();
      router.push('/login');
    }, 3000);
  });

  const onSubmit = async (data: UserResetPasswordFormValue) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      await resetPasswordUserMutation.mutate({
        id: data.id,
        body: data,
      });
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password"
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
                <FormLabel>Re-type Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Re-enter your password"
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
              Reset Password
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
