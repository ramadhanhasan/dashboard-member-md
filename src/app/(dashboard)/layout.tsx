"use client";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import DefaultLayout from "../../components/Layouts/DefaultLayout";
import FloatingWhatsAppButton from "../../components/FloatingWhatsAppButton";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);

  // useEffect(() => {
  //   setTimeout(() => setLoading(false), 1000);
  // }, []);

  return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        {loading ? <Loader /> : children}
        <FloatingWhatsAppButton />
      </div>
  );
}
