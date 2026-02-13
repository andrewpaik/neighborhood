import type { Metadata } from "next";
import { DM_Sans, Caveat } from "next/font/google";
import { AuthProvider } from "@/components/shared/auth-provider";
import { AnalyticsProvider } from "@/components/shared/analytics-provider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Neighborhood — Actually make friends",
  description:
    "Join a neighborhood of 50 people. Do fun stuff together every week. Actually make friends.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
          <AuthProvider>
            <AnalyticsProvider>{children}</AnalyticsProvider>
          </AuthProvider>
        </body>
    </html>
  );
}
