"use client";

import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import AuthProviders from "../global_context/Providers";
import { Toaster } from "../components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);

  // const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Code that uses HTMLElement or other browser-specific objects
      const element = document.getElementById('loaded');
      if (element instanceof HTMLElement) {
        // Do something with the element
      }
    }
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
      <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body>
        <div id="loaded" className="dark:bg-boxdark-2 dark:text-bodydark">
          <AuthProviders>
            {loading ? <Loader /> : children}
          </AuthProviders>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
