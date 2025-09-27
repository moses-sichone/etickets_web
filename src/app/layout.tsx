import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TicketHub - Discover & Book Amazing Venues and Events",
  description: "Find and book perfect venues for your events or get tickets to amazing experiences. Easy booking, secure payments, and instant confirmations.",
  keywords: ["TicketHub", "venues", "events", "booking", "tickets", "event planning", "concerts", "conferences"],
  authors: [{ name: "TicketHub Team" }],
  openGraph: {
    title: "TicketHub - Discover & Book Amazing Venues and Events",
    description: "Find and book perfect venues for your events or get tickets to amazing experiences.",
    url: "https://tickethub.com",
    siteName: "TicketHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TicketHub - Discover & Book Amazing Venues and Events",
    description: "Find and book perfect venues for your events or get tickets to amazing experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
