import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google"; // <--- Import fonts here
import "./globals.css";

// --- DEFINE FONTS ---
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-serif" 
});

export const metadata: Metadata = {
  title: "Riyas Ahamed | Full Stack Developer",
  description: "Portfolio of Riyas Ahamed - Full Stack Software Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}