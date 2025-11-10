import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flymen",
  description: "Discussions between users play out in a variety of topics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" className="m-0 p-0">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/PenFavicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/PenFavicon-16x16.png"/>
      </head>
      <body className={`${inter.className} bg-background overscroll-none text-[#000000] flex flex-col h-screen`}>
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
