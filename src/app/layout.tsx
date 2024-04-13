// import "./globals.css";
import "@styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Nav from "@components/Nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Summarizer",
  description: "Make summary from URL",
  icons: {
    icon: "./assets/favicon.ico",
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="main">
          <div className="gradient" />
        </div>
        <div className="app">
          <Nav />
          {children}
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
