import type { Metadata } from "next";
import "./globals.css";
import SidebarMenu from "@/app/components/SidebarMenu";
import { Poppins } from "next/font/google";
import FeedbackFooter from "./components/FeedbackFooter";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
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
      <body className="min-h-screen flex flex-col font-sans bg-neutral-900 text-white">
        <SidebarMenu />
        
        <main className="flex-1">{children}</main>
        <FeedbackFooter/>
      </body>
    </html>
  );
}
