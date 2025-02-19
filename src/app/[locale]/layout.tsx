import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/header";
import Footer from "@/components/Footer/Footer";
import ReduxProvider from "./providers/ReduxProvider";
import { Directions, Languages } from "../constants/enumbs";
import { Locale } from "@/i18n.config";
import { Toaster } from "@/components/ui/toaster";
import NextAuthSessionProvider from "./providers/SessionProvider";

export async function generateStaticParams() {
  return [{ locale: Languages.ARABIC }, { locale: Languages.ENGLISH }];
}


const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});


export const metadata: Metadata = {
  title: " Food Ordering App",
  description: "Full Stack Food Ordering App With Admin Dashboard",
};

export default async function RootLayout({
  params,
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>
}>) {
  const locale = (await params).locale;
  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}>
      <body
        className={
          locale === Languages.ARABIC ? cairo.className : roboto.className}>
        <NextAuthSessionProvider>
          <ReduxProvider>
            <Header />
            {children}
            <Footer />
            <Toaster />
          </ReduxProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
