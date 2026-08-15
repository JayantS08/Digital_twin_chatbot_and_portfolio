import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jayant Singh — AI × Algorithms × Systems",
  description: "Interactive portfolio and AI digital twin of Jayant Singh."
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="en"><body>{children}</body></html>;
}
