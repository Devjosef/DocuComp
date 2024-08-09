import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DocuComp",
  description: "Seamless, collaborative environment for document management and composition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <header className="bg-primary p-4 text-white">
          <h1 className="text-xl font-bold">DocuComp</h1>
        </header>
        <main className="flex-grow">{children}</main>
        <footer className="bg-lightGrey p-4 text-center">
          <p className="text-grey">© 2023 DocuComp. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}