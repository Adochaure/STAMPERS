import type { Metadata } from "next";
import { Italiana } from "next/font/google";
import "./globals.css";

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "STAMPERS",
  description: "STAMPERS basic layout",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${italiana.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
