import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const fontSans = Montserrat({
  variable: "--font-geist-sans",
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
        className={`${fontSans.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
