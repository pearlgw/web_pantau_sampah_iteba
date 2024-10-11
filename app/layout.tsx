/* eslint-disable @next/next/no-sync-scripts */
/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import Head from "next/head";
import NavbarPage from "@/components/navbar/page";

export const metadata: Metadata = {
  title: "Pantau Iteba",
  description: "Natagw | Pantau Iteba",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        <link href="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css" rel="stylesheet" />
      </Head>
      <body
        className={`antialiased font-mulish bg-gray-900 overflow-x-hidden`}
      >
        <NavbarPage />
        <main>
          {children}
        </main>
        
        <script src="https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
