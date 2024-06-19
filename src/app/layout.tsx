import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ProgressBar } from "@/components/ProgressBar";
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/Toaster";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Todo List",
  description: "A simple app created for NextJS server actions practice",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Navbar />
        <ProgressBar />
        <Toaster position="bottom-right" />
        <main className="w-screen h-screen flex justify-center px-10">
          {children}
        </main>
      </body>
    </html>
  );
}
