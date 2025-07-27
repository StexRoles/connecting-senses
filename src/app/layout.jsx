import { Nunito } from "next/font/google";
import "@/styles/globals.css";
import OrientationGuard from "@/components/orientation-guard";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata = {
  title: "Conectando Sentidos",
  description: "Conectando los sentidos a través de la tecnología",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body
        className={`${nunito.variable} font-nunito antialiased`}
      >
        <OrientationGuard>
          {children}
        </OrientationGuard>
      </body>
    </html>
  );
}
