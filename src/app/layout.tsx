import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../assets/globals.css";
import {
  APP_NAME,
  APP_DESCRIPTION,
  SERVER_URL,
  KeyWords,
  Graph,
} from "@/lib/constants/index";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${APP_NAME}`,
  description: `${APP_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
  keywords: KeyWords,
  openGraph: {
    title: Graph.title,
    description: Graph.description,
    url: Graph.url,
    siteName: Graph.siteName,
    images: [
      {
        url: "/images/Galaxy.png",
        width: 1200,
        height: 630,
        alt: Graph.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Graph.title,
    description: Graph.description,
    images: ["/images/Galaxy.svg"],
  },
  alternates: {
    canonical: SERVER_URL,
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
        <link rel="icon" href="/icon.ico" type="image/x-icon" />
        <meta
          name="google-adsense-account"
          content="ca-pub-4454909616652906"
        ></meta>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4454909616652906"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
