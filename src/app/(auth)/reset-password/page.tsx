"use client";

import React, { Suspense, use, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/logo/logo-md.png";
import validateCode from "./_repository/validateCode";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../../../components/ui/alert";
import { Button } from "../../../components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { IResetPassword } from "./_interfaces";
import { UserResetPasswordForm } from "../../../components/Forms/UserResetPasswordForm";

function ResetPasswordPageComponent() {
  const defaultErrorMsg =
    "Please click link in your email to validate your reset link";
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const id = searchParams.get("id");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [errMsg, setErrMsg] = useState(defaultErrorMsg);
  const [user, setUser] = useState<Partial<IResetPassword>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await validateCode({ id, code });
        console.log(user);
        setUser({ ...user, forgotten_code: code ? code : "" });
        setIsValid(true);
        setIsLoaded(true);
      } catch (error: any) {
        setErrMsg(error?.error);
        setIsLoaded(true);
      }
    };

    if (id && code) {
      fetchData().catch((error) => {
        setIsValid(false);
        setIsLoaded(true);
      });
    } else {
      setIsValid(false);
      setIsLoaded(true);
    }
  }, [code, id]);

  return (
      <div className="mx-auto max-w-screen-lg p-4 md:p-6 2xl:p-10">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="items-center">
            <div className="w-full xl:block">
              <div className="px-26 py-17.5 text-center">
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

                {/* <p className="2xl:px-20">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                  suspendisse.
                </p> */}
              </div>
            </div>

            <div className="w-full xl:block">
              <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
                {isLoaded && (
                  <>
                    {isValid ? (
                      <UserResetPasswordForm initialData={user} />
                    ) : (
                      <>
                        <Alert variant="destructive">
                          <AlertTitle>Verification Code Failed!</AlertTitle>
                          <AlertDescription>{errMsg}</AlertDescription>
                        </Alert>
                        <Button
                          variant="link"
                          onClick={() => {
                            router.replace("/login");
                          }}
                          className="w-full"
                        >
                          Sign In
                        </Button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default function ResetPasswordPage() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <ResetPasswordPageComponent />
    </Suspense>
  )
}
