"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useToast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
} from "../ui/dialog";
import { IReferralLinkAttribute } from "../../app/(dashboard)/links/_interfaces";
import useCreateReferralLinkAttributeQuery from "../../app/(dashboard)/links/_query/useCreateReferralLinkAttributeQuery";
import useUpdateReferralLinkAttributeQuery from "../../app/(dashboard)/links/_query/useUpdateReferralLinkAttributeQuery";
import { notification } from "antd";

const formSchema: z.ZodType<IReferralLinkAttribute> = z.object({
  id: z.optional(z.string()),
  utm_pixel: z.optional(z.string()),
  utm_pixel_button_chat: z.optional(z.string()),
  utm_pixel_button_checkout: z.optional(z.string()),
});

type FormValues = z.infer<typeof formSchema>;

interface FormProps {
  initialData: IReferralLinkAttribute | null;
  id?: string | null;
  setRefetch: () => void;
  isOpen: boolean;
  onClose: () => void;
  referralLinkId: string;
}

export const ReferralLinkAttributeForm: React.FC<FormProps> = ({
  initialData,
  id,
  setRefetch,
  isOpen,
  onClose,
  referralLinkId
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const defaultValues: IReferralLinkAttribute = initialData
    ? {
        ...initialData,
      }
    : {
        utm_pixel: "",
        utm_pixel_button_chat: "",
        utm_pixel_button_checkout: "",
      };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      // Set form defaults dynamically
      form.reset({ ...initialData });
    }
  }, [initialData, form.reset]);

  const createMutation = useCreateReferralLinkAttributeQuery(() => {
    setRefetch();
    onClose();
    notification.open({
      message: "Tambah meta pixel berhasil",
      type: "success",
    });
    form.reset();
  });

  const updateMutation = useUpdateReferralLinkAttributeQuery(() => {
    setRefetch();
    onClose();
    notification.open({
      message: "Ubah meta pixel berhasil",
      type: "success",
    });
    form.reset();
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      data.referral_link_id = referralLinkId;
      if (initialData) {
        await updateMutation.mutate({
          id,
          body: data
        });
      } else {
        await createMutation.mutate({
          body: data
        });
      }
    } catch (error: any) {
      console.log(error);
      notification.open({
        type: "error",
        message: "Uh oh! Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <div className="flex items-center justify-between">
            <Heading
              title={initialData ? "Ubah Pixel Meta" : "Tambah Pixel Meta"}
              description="Untuk tracking data pixel Meta Kamu, silakan input code pixel dibawah ini"
            />
          </div>
          <Separator />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8"
            >
              {/* <div className="gap-8 md:grid md:grid-cols-3"> */}
              <FormField
                control={form.control}
                name="utm_pixel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode Pixel</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Masukkan pixel code"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <div className="gap-8 md:grid md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="utm_pixel_button_chat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode </FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Masukkan pixel code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              {/* <div className="gap-8 md:grid md:grid-cols-3"> */}
              {/* <FormField
                  control={form.control}
                  name="utm_pixel_button_checkout"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kode Pixel</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Masukkan pixel code"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
              <div className="text-right">
                <Button disabled={loading} className="text-white" type="submit">
                  Simpan
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
