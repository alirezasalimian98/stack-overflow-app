import React from "react";

import { Inter, Space_Grotesk } from "next/font/google";

import { Metadata } from "next";

import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

import "./globals.css";
import "../styles/prism.css";

import { ThemeProvider } from "@/context/ThemeProvider.tsx";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  title: "Devflow",
  description:
    "a place for developers to find the answer to their own question and contribute in solving other problems !",
  icons: {
    icon: "/assets/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <ClerkProvider
        appearance={{
          elements: {
            fromButtonPrimary: "primary-gradient",
            footerActionLink: "primary-text-gradient hover:text-primary-500",
          },
        }}
      >
        <html lang="en">
          <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
            <SignedOut>{/* <SignInButton /> */}</SignedOut>

            {children}
          </body>
        </html>
      </ClerkProvider>
    </ThemeProvider>
  );
}
