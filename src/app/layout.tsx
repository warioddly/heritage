import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Header} from "@/components/layouts/Header";
import {ReactNode} from "react";
import {authors} from "@/core/data/authors";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  applicationName: "Heritage",
  title: "Heritage Tree",
  description: "The family tree of the Kyrgyz people (Генеалогическое древо кыргызов)🌳",
  authors: authors,
  keywords: ["Heritage Tree", "Heritage", "Tree", "Kyrgyzstan", "Kyrgyz", "Kyrgyz Heritage", "Kyrgyz Family Tree", "Kyrgyzstan Heritage", "Kyrgyzstan Tree"],
  icons: [
    {
      rel: "icon",
      url: "/images/icons/favicon.ico",
    },
    {
        rel: "apple-touch-icon",
        url: "/images/icons/apple-touch-icon.png",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
