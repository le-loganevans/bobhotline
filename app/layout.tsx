import type { Metadata } from "next";
import "./globals.css";
import SidebarMenu from "@/app/components/SidebarMenu";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins", // your custom CSS variable name
  display: "swap",
});

export const metadata: Metadata = {
  title: "bob hotline",
  description: "project built by lestudio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans">
        <SidebarMenu />
        {children}
      </body>
    </html>
  );
}
