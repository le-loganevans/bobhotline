import type { Metadata } from "next";
import "./globals.css";
import SidebarMenu from "@/app/components/SidebarMenu";


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
    <html lang="en">
      <body>
        <SidebarMenu />
        {children}
      </body>
    </html>
  );
}
