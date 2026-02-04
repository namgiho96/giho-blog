import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = localFont({
  src: "./fonts/GeistMonoVF.woff", // JetBrains Mono 대신 Geist Mono 사용
  variable: "--font-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "my-blog | Developer's Terminal",
  description: "A developer-focused blog with terminal aesthetics",
  keywords: ["blog", "development", "coding", "tech"],
  authors: [{ name: "my-blog" }],
  creator: "my-blog",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://my-blog.com",
    title: "my-blog | Developer's Terminal",
    description: "A developer-focused blog with terminal aesthetics",
    siteName: "my-blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "my-blog | Developer's Terminal",
    description: "A developer-focused blog with terminal aesthetics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <Providers>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
