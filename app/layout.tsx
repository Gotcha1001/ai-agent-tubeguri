import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Oswald } from "next/font/google";
import { ConvexClientProvider } from "./ConvexClientProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "AI Agent Platform",
  description:
    "An App where you can build AI Agents by simply draging and droping",
};

const oswald = Oswald({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={oswald.className}>
          <ConvexClientProvider>
            <Provider>{children}</Provider>

            <Toaster richColors />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
