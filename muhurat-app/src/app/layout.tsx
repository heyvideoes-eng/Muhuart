import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import { cn } from "@/lib/utils";

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "MUHURAT ESSENTIALS | Luxury Jewelry",
  description: "Mindful design and ethical sourcing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", cormorant.variable, inter.variable)} suppressHydrationWarning>
      <body className={`font-sans flex flex-col min-h-screen bg-background text-text-primary selection:bg-gold-primary/30 selection:text-white`} suppressHydrationWarning>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
