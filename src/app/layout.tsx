import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import styles from './global.module.css'

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Quiz App",
  description: "Assess your frontend knowledge",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} ${styles.bg_image}`}>{children}</body>
    </html>
  );
}
