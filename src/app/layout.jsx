import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import OrientationGuard from "@/components/orientation-guard";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Conectando Sentidos",
  description: "Conectando los sentidos a través de la tecnología",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <OrientationGuard>
          {children}
        </OrientationGuard>
      </body>
    </html>
  );
}
