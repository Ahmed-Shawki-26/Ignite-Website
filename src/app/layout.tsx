import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { headers } from "next/headers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ignite Marketing",
  description: "A collective of experienced marketing professionals from Egypt, ready to transform your business with innovative digital solutions. 200+ satisfied clients, 98% success rate.",
  keywords: "digital marketing, web development, branding, Egypt marketing, social media marketing, SEO, advertising",
  authors: [{ name: "Ignite Marketing Team" }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: '/favicon.png',
      },
    ],
  },
  openGraph: {
    title: "Ignite Marketing",
    description: "A collective of experienced marketing professionals from Egypt, ready to transform your business with innovative digital solutions.",
    type: "website",
    locale: "en_US",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const locale = headersList.get('x-locale') || 'en';
  
  return (
    <html 
      className={`${geistSans.variable} ${geistMono.variable}`} 
      lang={locale}
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        <Script
          crossOrigin="anonymous"
          src="//unpkg.com/same-runtime/dist/index.global.js"
        />
      </head>
      <body suppressHydrationWarning className="antialiased">
        <LanguageProvider>
          <ClientBody>{children}</ClientBody>
        </LanguageProvider>
      </body>
    </html>
  );
}
