import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dr Alan V.L. — The Medical Detective",
  description:
    "Doctor, Author, Entrepreneur & Public Speaker. Discover the cinematic journey of Dr Alan V.L. — from ₹600 a day on the streets to building a medical empire.",
  keywords: [
    "Dr Alan VL",
    "The Medical Detective",
    "doctor author entrepreneur",
    "Neem Rosa International",
    "Medmelo",
    "medical speaker India",
  ],
  openGraph: {
    title: "Dr Alan V.L. — The Medical Detective",
    description:
      "Doctor, Author, Entrepreneur & Public Speaker. From the streets to the clinic.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: "#060606" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ background: "#060606" }}>
        {children}
      </body>
    </html>
  );
}
