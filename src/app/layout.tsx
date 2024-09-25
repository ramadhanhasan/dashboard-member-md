import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";
import AuthProviders from "../global_context/Providers";
import { Toaster } from "../components/ui/toaster";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Mahir Digital Member Area',
  description: 'Dashboard for member mahir digital learning course'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
      <link rel="icon" href="/icon.ico" sizes="any" />
      </head>
      <body>
        <div id="loaded" className="dark:bg-boxdark-2 dark:text-bodydark">
          <AuthProviders>
            {children}
          </AuthProviders>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
