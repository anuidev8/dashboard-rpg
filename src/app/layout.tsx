import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import 'atropos/css'
import '@/styles/swiper-theme.css'

import { Providers } from "./Providers";
import SessionGuard from "@/components/auth/SessionGuard";




const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "RPG Learning Dashboard",
  description: "A gamified learning experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
       

       <Providers>
          <SessionGuard>
 
            {children}

  
          </SessionGuard>
        </Providers>
     

          
        
    
      </body>
    </html>
  );
}

