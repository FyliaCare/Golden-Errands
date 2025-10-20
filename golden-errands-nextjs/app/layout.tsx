import type { Metadata, Viewport } from "next";
import "./globals.css";
import AntdProvider from "@/components/AntdProvider";
import { AuthProvider } from "@/contexts/AuthContext";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

export const metadata: Metadata = {
  title: "Golden Errands - Delivery Platform",
  description: "Professional delivery and errand services across Ghana",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Golden Errands",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: "#E63946",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#E63946" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Golden Errands" />
      </head>
      <body>
        <ServiceWorkerRegistration />
        <AntdProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </AntdProvider>
      </body>
    </html>
  );
}
