import type { Metadata } from "next";
import { Doto, Italiana } from "next/font/google";
import "./globals.css";

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "STAMPERS",
  description: "STAMPERS basic layout",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} ${doto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}