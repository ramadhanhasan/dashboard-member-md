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
import useVerifiedUserQuery from "../../app/(auth)/verified/_query/useVerifiedUserQuery";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import {
  BankList,
  haveLearnedOption,
  workOption,
} from "../../constants/data";
import { PasswordInput } from "../ui/password-input";

const numberRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/,
);

const formSchema: z.ZodType<IUserVerified> = z
  .object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    id: z.string(),
    activation_code: z.string(),
    name: z.string().min(4),
    phone: z.string().regex(numberRegex, "invalid phone number"),
    // select_birth_date: z.optional(
    //   z.date({
    //     required_error: "A date of birth is required.",
    //   }),
    // ),
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
    work: z.string(),
    work_others: z.optional(z.string()),
    have_studied: z.string(),
    why_join: z.string(),
    information_from: z.string()
  })
  .superRefine((val, ctx) => {
    if (val.password !== val.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Password is not the same as confirm password",
        path: ["confirmPassword"],
      });
    }
    if (val.work === 'Lainnya' && val.work_others == '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'field ini harus diisi',
        path: ['work_others']
      });
    }
  });

type UserFormValue = z.infer<typeof formSchema>;

interface UserVerifiedFormProps {
  initialData: Partial<IUserVerified>;
  id?: string;
  provinces: IProvince[];
}

export const UserVerifiedForm: React.FC<UserVerifiedFormProps> = ({
  initialData,
  id,
  provinces,
}) => {
  const [errorMsg, setErrorMsg] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const defaultValues: Partial<IUserVerified> = {
    ...initialData,
    // select_birth_date: new Date(initialData.birth_date ?? Date.now()),
    bank_name: BankList[5].name,
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
  const [work, setWork] = useState("");

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
  }, [provinces, initialData.province_id, initialData.city_id, cities]);

  const verifiedUserMutation = useVerifiedUserQuery(() => {
    notification.open({
      message: "Verifikasi Akun Kamu Sudah Berhasil",
      type: "success",
      description:
        "halaman ini akan otomatis pindah ke halaman login dalamn waktu 2 detik",
    });
    setTimeout(() => {
      router.refresh();
      router.push("/login");
    }, 2000);
  });

  const onSubmit = async (data: UserFormValue) => {
    if (work === "Lainnya") data.work = data.work_others || '';

    try {
      setLoading(true);
      setErrorMsg(null);
      // data.birth_date = TimestampConverter(data.select_birth_date, 'YYYY/MM/DD');
      await verifiedUserMutation.mutate({
        id: data.id,
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
          <AlertTitle>Verifikasi Akun Kamu Gagal</AlertTitle>
          <AlertDescription>{errorMsg}</AlertDescription>
        </Alert>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <h2 className="mb-9 text-2xl font-bold text-black dark:text-white">
            Buat Kata Sandi Kamu
          </h2>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="Masukkan password Kamu"
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
                <FormLabel>Ketik Ulang Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    type="password"
                    placeholder="Masukkan kembali password Kamu"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="mb-9 pt-10 text-2xl font-bold text-black dark:text-white">
            Informasi Pribadi
          </h2>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Lengkap</FormLabel>
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan alamat email"
                    disabled
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
                <FormLabel>Nomor Whatsapp</FormLabel>
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

          {/* <FormField
            control={form.control}
            name="select_birth_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Lahir</FormLabel>
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
          /> */}

          <div className="mb-4 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/3">
              <FormField
                control={form.control}
                name="province_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Provinsi</FormLabel>
                    <Select
                      disabled={loading}
                      onValueChange={(e) => {
                        field.onChange(e);
                        handleProvinceChange(e);
                      }}
                      defaultValue={field.value}
                      value={province}
                      // value={province || field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih provinsi"
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
            </div>

            <div className="w-full xl:w-1/3">
              <FormField
                control={form.control}
                name="city_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kota/Kabupaten</FormLabel>
                    <Select
                      disabled={loading || province === ""}
                      onValueChange={(e) => {
                        field.onChange(e);
                        handleCityChange(e);
                      }}
                      // value={city || field.value}
                      value={city}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih kota/kabupaten"
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
            </div>
            <div className="w-full xl:w-1/3">
              <FormField
                control={form.control}
                name="subdistrict_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kecamatan</FormLabel>
                    <Select
                      disabled={loading || city === ""}
                      onValueChange={(e) => {
                        field.onChange(e);
                        setSubdistrict(e);
                      }}
                      value={subdistrict}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            defaultValue={field.value}
                            placeholder="Pilih kecamatan"
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
            </div>
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alamat Lengkap</FormLabel>
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
                <FormLabel>Kode Pos</FormLabel>
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

          <h2 className="mb-9 pt-10 text-2xl font-bold text-black dark:text-white">
            Lengkapi Nomor Rekening Kamu (Untuk Transfer Komisi Affiliate)
          </h2>

          <FormField
            control={form.control}
            name="bank_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Bank</FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
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
                          <SelectItem key={bank.name} value={bank.name}>
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
                <FormLabel>Nomor Rekening Bank</FormLabel>
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
                <FormLabel>Nama Pemilik Rekening</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Masukkan nama pemelik rekening"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <h2 className="mb-9 pt-10 text-2xl font-bold text-black dark:text-white">
            Informasi Tambahan
          </h2>

          <FormField
            control={form.control}
            name="work"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Mana yang paling menggambarkan pekerjaanmu?
                </FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
                    onValueChange={(e) => {
                      setWork(e);
                      field.onChange(e);
                    }}
                    value={work}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Pilih Pekerjaan"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup className="max-h-[15rem] overflow-y-auto">
                        {/* @ts-ignore  */}
                        {workOption.map((value) => (
                          <SelectItem key={value.value} value={value.value}>
                            {value.label}
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

          {work === "Lainnya" && (
            <FormField
              control={form.control}
              name="work_others"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <FormItem>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="Tuliskan pekerjaanmu"
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="have_studied"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Apa Kamu pernah belajar digital marketing sebelumnya?
                </FormLabel>
                <FormControl>
                  <Select
                    disabled={loading}
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
                          placeholder="Pilih Jawabannya"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup className="max-h-[15rem] overflow-y-auto">
                        {/* @ts-ignore  */}
                        {haveLearnedOption.map((value) => (
                          <SelectItem key={value.value} value={value.value}>
                            {value.label}
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
            name="information_from"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dari mana Kamu tau Mahir Digital?</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Darimana Kamu tau ?"
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
            name="why_join"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kenapa ingin bergabung Mahir Digital? Dan apa harapannya?</FormLabel>
                <FormControl>
                  <Input
                      type="text"
                      placeholder="Kenapa ?"
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
              Simpan Data
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
