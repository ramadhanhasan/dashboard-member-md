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
import { IUser } from "../../app/(dashboard)/profile/_interfaces";
import usePutProfileQuery from "../../app/(dashboard)/profile/_query/usePutProfileUserQuery";
import { BankList } from "../../constants/data";

const numberRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema: z.ZodType<IUser> = z.object({
  id: z.string(),
  name: z.string().min(4),
  phone: z.string().regex(numberRegex, "invalid phone number"),
  select_birth_date: z.optional(
    z.date({
      required_error: "A date of birth is required.",
    }),
  ),
  province_id: z.string().min(2, { message: "Choose province" }),
  city_id: z.string().min(2, { message: "Choose city" }),
  subdistrict_id: z.string().min(2, { message: "Choose subdistrict" }),
  address: z.string(),
  postal_code: z
    .string()
    .max(5)
    .min(5)
    .regex(numberRegex, "postal code must be number"),
  account_name: z.string(),
  account_number: z
    .string()
    .regex(numberRegex, "account number must be number"),
  bank_name: z.string(),
});

type UserFormValue = z.infer<typeof formSchema>;

interface UserProfileFormProps {
  initialData: Partial<IUser>;
  id?: string;
  provinces: IProvince[];
}

export const UserProfileForm: React.FC<UserProfileFormProps> = ({
  initialData,
  id,
  provinces,
}) => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<IUser> = {
    ...initialData,
    select_birth_date: new Date(initialData.birth_date ?? ""),
  };
  const [cities, setCities] = useState<ICity[]>([]);
  const [subdistricts, setSubdistricts] = useState<ISubdistrict[]>([]);
  const [province, setProvince] = useState(initialData.province_id ?? "");
  const [city, setCity] = useState(initialData.city_id ?? "");
  const [subdistrict, setSubdistrict] = useState("");
  const router = useRouter();
  const [date, setDate] = useState<Date | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const [isEditAction, setIsEditAction] = useState<boolean>(false);

  useEffect(() => {
    const initiateCities = async (province_id: string) => {
      const index = provinces.findIndex(
        (province) => province.id == province_id,
      );
      setCities(provinces[index]?.cities ?? []);
    };

    const initiateSubdistricts = async (city_id: string) => {
      const index = cities.findIndex((city) => city.id == city_id);
      setSubdistricts(cities[index]?.subdistricts ?? []);
    };

    if (initialData.province_id && provinces.length > 0) {
      initiateCities(initialData.province_id);
    }

    if (initialData.city_id && provinces.length > 0) {
      initiateSubdistricts(initialData.city_id);
    }
  }, [provinces, cities, initialData.city_id, initialData.province_id]);

  const updateProfileMutation = usePutProfileQuery(() => {
    notification.open({
      message: "Update profile success",
      type: "success",
    });
    setIsEditAction(false);
    router.refresh();
  });

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoading(true);
      setErrorMsg(null);
      data.birth_date = data.select_birth_date?.toLocaleDateString();
      await updateProfileMutation.mutate({
        body: data,
      });
      setLoading(false);
    } catch (error) {
      setErrorMsg(error);
      setLoading(false);
    }
  };

  // Handle province change
  const handleProvinceChange = (e: string) => {
    setProvince(e);
    form.setValue("city_id", "");
    form.setValue("subdistrict_id", "");
    const index = provinces.findIndex((province) => province.id == e);
    setCities(provinces[index].cities);
    setCity(""); // Reset city when province changes
    setSubdistrict(""); // Reset subdistrict when province changes
  };

  // Handle city change
  const handleCityChange = (e: string) => {
    setCity(e);
    form.setValue("subdistrict_id", "");
    const index = cities.findIndex((city) => city.id == e);
    setSubdistricts(cities[index].subdistricts);
    setSubdistrict(""); // Reset subdistrict when city changes
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
          Informasi Pribadi
        </h3>
        {!isEditAction ? (
          <Button
            onClick={() => {
              setIsEditAction(!isEditAction);
            }}
            className="text-white"
          >
            Edit Akun
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsEditAction(!isEditAction);
            }}
            variant={"outline"}
          >
            Batalkan Edit
          </Button>
        )}
      </div>
      <div className="p-7">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-2"
          >
            <fieldset disabled={!isEditAction}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Nama Lengkap</FormLabel>
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Nomor Whatsapp</FormLabel>
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

              <FormField
                control={form.control}
                name="select_birth_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="mb-0">Tanggal Lahir</FormLabel>
                    <Popover open={isOpen} onOpenChange={setIsOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              `${format(field.value, "PPP")}`
                            ) : (
                              <span>Pilih tanggal</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          captionLayout="dropdown"
                          selected={date || field.value}
                          onSelect={(selectedDate) => {
                            setDate(selectedDate!);
                            field.onChange(selectedDate);
                          }}
                          onDayClick={() => setIsOpen(false)}
                          fromYear={1945}
                          toYear={new Date().getFullYear()}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bank_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Nama Bank</FormLabel>
                    <FormControl>
                    <Select
                      disabled={loading || !isEditAction}
                      onValueChange={(e) => {
                        field.onChange(e);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih Bank"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="max-h-[15rem] overflow-y-auto">
                          {/* @ts-ignore  */}
                          {BankList.map((bank) => (
                            <SelectItem
                              key={bank.name}
                              value={bank.name}
                            >
                              {bank.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="account_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Nomor Rekening Bank</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nomor rekening bank"
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
                name="account_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Nama Rekening Bank</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan nama rekening bank"
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
                name="province_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Provinsi</FormLabel>
                    <Select
                      disabled={loading || !isEditAction}
                      onValueChange={(e) => {
                        field.onChange(e);
                        handleProvinceChange(e);
                      }}
                      defaultValue={field.value}
                      value={province || field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih Provinsi"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="max-h-[15rem] overflow-y-auto">
                          {/* @ts-ignore  */}
                          {provinces.map((province) => (
                            <SelectItem key={province.id} value={province.id}>
                              {province.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Kota/Kabupaten</FormLabel>
                    <Select
                      disabled={loading || province === "" || !isEditAction}
                      onValueChange={(e) => {
                        field.onChange(e);
                        handleCityChange(e);
                      }}
                      value={city || field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih Kota/kabupaten"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="max-h-[15rem] overflow-y-auto">
                          {/* @ts-ignore  */}
                          {cities.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subdistrict_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Kecamatan</FormLabel>
                    <Select
                      disabled={loading || city === "" || !isEditAction}
                      onValueChange={(e) => {
                        field.onChange(e);
                        setSubdistrict(e);
                      }}
                      value={subdistrict || field.value}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih Kecamatan"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup className="max-h-[15rem] overflow-y-auto">
                          {/* @ts-ignore  */}
                          {subdistricts.map((subdistrict) => (
                            <SelectItem
                              key={subdistrict.id}
                              value={subdistrict.id}
                            >
                              {subdistrict.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Alamat Lengkap</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan alamat lengkap"
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
                name="postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-0">Kode Pos</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Masukkan kode pos"
                        disabled={loading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditAction && (
                <div className="mb-5">
                  <Button
                    type="submit"
                    value="Submit Data"
                    disabled={loading}
                    className="mt-4 w-full pb-7 pt-7 text-white"
                  >
                    Simpan Data
                  </Button>
                </div>
              )}
            </fieldset>
          </form>
        </Form>
      </div>
    </>
  );
};
