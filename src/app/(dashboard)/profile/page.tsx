"use client";

import Image from "next/image";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { Breadcrumbs } from "../../../components/breadcrumbs";
import useGetProvincesQuery from "../../api/_query/useGetProvinces";
import { useEffect, useState } from "react";
import { IUser } from "./_interfaces";
import { UserVerifiedForm } from "../../../components/Forms/UserVerifiedForm";
import { UserProfileForm } from "../../../components/Forms/UserProfileForm";
import getDetailRepository from "./_repository/getDetailRepository";
import { UserChangePasswordForm } from "../../../components/Forms/UserChangePasswordForm";
import { UserMembershipInformationForm } from "../../../components/Forms/UserMembershipInformationForm";

export const detailPage = {
  baseTitle: "Dashboard",
  basePath: "/",
  title: "Akun saya",
  path: "profile",
};

const Profile = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { dataProvinces, refetechDataProvinces } = useGetProvincesQuery({
    limit: 1000,
    sortParams: { sort: "name", order: "asc" },
  });

  const [user, setUser] = useState<Partial<IUser>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await getDetailRepository();
        refetechDataProvinces();
        setUser({ ...user });
        setIsLoaded(true);
      } catch (error: any) {
        setIsLoaded(true);
      }
    };

    fetchData().catch((error) => {
      setIsLoaded(true);
    });
  }, [refetechDataProvinces]);

  const breadcrumbItems = [
    { title: detailPage.baseTitle, link: detailPage.basePath },
    { title: detailPage.title, link: detailPage.basePath + detailPage.path },
  ];

  return (
    <DefaultLayout>
      <div className="mx-auto max-w-270">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col flex-col-reverse lg:flex-row lg:space-x-8">
          <div className="flex-1">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {isLoaded && user && (
                <UserProfileForm
                  id={user?.id}
                  initialData={user}
                  provinces={dataProvinces}
                />
              )}
            </div>
          </div>
          <div className="mb-5 flex-shrink-0 lg:w-1/3">
            <div className="mb-5 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              {isLoaded && user && (
                <UserMembershipInformationForm initialData={user} />
              )}
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <UserChangePasswordForm />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Profile;
