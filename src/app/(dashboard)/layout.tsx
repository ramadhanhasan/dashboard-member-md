"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useContext, useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import FloatingWhatsAppButton from "../../components/FloatingWhatsAppButton";
import { AuthContext } from "../../global_context/Auth";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const { userProfile, isAuth } = useContext(AuthContext)
  const router = useRouter()
  // const pathname = usePathname();

  useEffect(() => {
    if (isAuth && userProfile) {
      router.push('/');
    }
    setTimeout(() => setLoading(false), 1000);
  }, [isAuth, userProfile]);

  return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? <Loader /> : children}
        <FloatingWhatsAppButton />
      </div>
  );
}
