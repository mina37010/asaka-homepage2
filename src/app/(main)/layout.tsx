export const runtime = "edge";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "@/components/Link";
import "@/styles/globals.css";
import { Yusei_Magic } from "next/font/google";

const yusei = Yusei_Magic({
    weight: "400",
    subsets: ["latin"],
  });
  
  export const metadata = {
    title: "Yusei Magic Example",
    description: "Google Font Yusei Magic with Next.js",
  };

export default function MainLayout({children,}: {children: React.ReactNode;}) {
  return (
    <div className={yusei.className}>
      <Navbar />
      <main>{children}</main>
      <Link />
      <Footer />
    </div>
  );
}
