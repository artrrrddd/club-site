import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@uploadthing/react/styles.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { UploadThingProvider } from "@/components/providers/UploadThingProvider";
import { titillium } from "@/fonts/TitilliumSemiBold";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "КОМП.ЗДЕСЬ",
  description: "Компьютерный клуб КОМП.ЗДЕСЬ",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${titillium.variable} antialiased text-zinc-100 selection:bg-red-500`}
        style={{ backgroundColor: '#171717' }}
      >
        
        <SessionProvider>
          <UploadThingProvider>
            {children}
          </UploadThingProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
