// Imports
import "./global.css";
import MyApp from "./app";
import React from "react";
import { Providers } from "@/store/providers";
import { APP_NAME } from "@/constants/strings";

export const metadata = {
  title: APP_NAME,
  description: "Your one stop solution for WhatsApp !",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <MyApp>{children}</MyApp>
        </Providers>
      </body>
    </html>
  );
}
