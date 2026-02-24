import type { Metadata } from "next";
import ReduxProvider from "@/lib/redux/ReduxProvider";
import "./globals.css";


export const metadata: Metadata = {
  title: "Companion Ai",
  description: "Chat with your Favorite",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-neutral-900 w-full h-full text-white">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}