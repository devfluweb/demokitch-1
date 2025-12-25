import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Fork - Delicious Food Delivery",
  description: "Experience the finest cloud kitchen. Fresh, delicious meals delivered to your doorstep.",
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
