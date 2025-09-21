import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfairDisplay = Playfair_Display({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Me Caso Contigo - Organización de Bodas y Eventos",
  description: "Creamos experiencias únicas e inolvidables para tu boda, quinceaños y eventos especiales. Planificación integral con atención al detalle.",
  keywords: "bodas, quinceaños, eventos, organización, banquetes, catering, matrimonios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfairDisplay.className} bg-gradient-to-br from-slate-700/20 via-gray-700/25 to-stone-800/30 min-h-screen`}>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
