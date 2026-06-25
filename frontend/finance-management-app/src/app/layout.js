import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Manager from "./components/Manager";
import { Baloo_Bhai_2 } from 'next/font/google';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baloo = Baloo_Bhai_2({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: "smart finance management system",
  description: "Track your income, monitor expenses, and gain insights into your spending habits - all in one simple and secure platform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Manager/>
        {children}
      </body>
    </html>
  );
}
