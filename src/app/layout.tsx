
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import HeaderWithAuth from "@/components/layout/HeaderWithAuth";
import ArchitectFooter from "@/components/layout/ArchitectFooter";
import { Providers } from "./providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--architect-font-primary" });
const pretendard = localFont({
  src: "../fonts/Pretendard-Regular.woff2",
  variable: "--architect-font-korean",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "IdeaWorkLab v3.0",
  description: "The Architect of Thought and Talent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${inter.variable} ${pretendard.variable}`}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <HeaderWithAuth />
            <main className="flex-1">
              {children}
            </main>
            <ArchitectFooter />
          </div>
        </Providers>
      </body>
    </html>
  );
}
