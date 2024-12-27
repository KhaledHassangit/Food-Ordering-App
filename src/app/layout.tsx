import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "./providers/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: " Food Ordering App",
  description: "Full Stack Food Ordering App With Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className}`}>
          <ReduxProvider>
            <Header/>
            {children}
            <Footer/>
          </ReduxProvider>
      </body>
    </html>
  );
}
