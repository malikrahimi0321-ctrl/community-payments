import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Community Payments",
  description: "Community payment tracking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}