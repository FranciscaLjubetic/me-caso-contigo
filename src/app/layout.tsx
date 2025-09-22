import type { Metadata } from "next";
import { Libre_Baskerville } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import WhatsAppButton from "@/components/WhatsAppButton";

const libreBaskerville = Libre_Baskerville({ 
  subsets: ["latin"],
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: "Me Caso Contigo - Organización de Bodas y Eventos",
  description: "Creamos experiencias únicas e inolvidables para tu matrimonio y eventos especiales. Planificación integral con atención al detalle.",
  keywords: "matrimonios, bodas, eventos, organización, banquetes, catering, ceremonias",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${libreBaskerville.className} bg-gradient-to-br from-slate-700/20 via-gray-700/25 to-stone-800/30 min-h-screen`}>
        <Navbar />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
