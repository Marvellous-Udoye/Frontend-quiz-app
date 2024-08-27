import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import styles from './global.module.css';
import { DarkModeProvider, useDarkMode } from "@/contexts/DarkMode";

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

  const darkMode = (false)

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/fav.ico" />
      </head>
      <body className={`${rubik.className} ${styles.bg_image} ${darkMode ? styles['dark_bg'] : ''} `}>
        <DarkModeProvider>
          {children}
        </DarkModeProvider>
        </body>
    </html>
  );
}
