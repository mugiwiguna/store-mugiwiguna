import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import "./globals.css";

export const metadata: Metadata = {
  title: "store.mugiwiguna.dev — Quality Products, Great Prices",
  description:
    "Shop the latest collection with premium quality, competitive prices, and fast shipping across Indonesia.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="id">
        <body>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartDrawer />
        </body>
      </html>
    </ClerkProvider>
  );
}