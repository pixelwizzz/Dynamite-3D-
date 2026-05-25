import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Doritos Dinamita – Fiery Lime and Chilli | Unleash The Fiery Crunch",
  description:
    "Experience the explosive heat of Doritos Dinamita – Fiery Lime and Chilli. An immersive cinematic product showcase that puts the crunch in your hands.",
  keywords: ["Doritos", "Dinamita", "Fiery Lime", "Chilli", "snack", "chips"],
  openGraph: {
    title: "Doritos Dinamita – Fiery Lime and Chilli",
    description: "Unleash the Fiery Crunch. Scroll to experience.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
