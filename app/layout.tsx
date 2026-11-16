import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const fontInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sorteia Bingo",
  description: "Sorteia Bingo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body
        className={`${fontInter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
