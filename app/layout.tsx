import type { Metadata } from "next";
import "./globals.css";



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
        {children}
      </body>
    </html>
  );
}
