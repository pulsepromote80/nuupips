import Footer from "./components/Footer";
import Header from "./components/Header";
import "./globals.css";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import AppLayout from "./components/AppLayout";
import Providers from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

// const geistMono = Geist_Mono({
//   subsets: ["latin"],
//   variable: "--font-geist-mono",
// });

export const metadata = {
  title: "nupips | Professional Financial Education",
  description:
    "Expert-led courses in Forex education, Stock market fundamentals, trading psychology, and risk management.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/new-style.css" />
        <link rel="stylesheet" href="/assets/css/new-style2.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/react-quill@2.0.0/dist/quill.snow.css"
        />

        <Script
          src="/assets/js/vendor/jquery-3.7.1.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/js/bootstrap.min.js"
          strategy="beforeInteractive"
        />
      </head>

      <body className={`${geistSans.variable}`}>
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}

