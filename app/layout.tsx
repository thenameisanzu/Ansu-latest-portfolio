import type { Metadata, Viewport } from "next";
import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "./fonts.css";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const viewport: Viewport = {
  themeColor: "#f2eae0",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://ansuvs.dev"),
  title: "Ansu V S — Developer & Designer",
  description:
    "Freelance full-stack developer and designer based in India. Dreamer of Aethra Digital Solutions. Building cinematic, high-performance web products.",
  keywords: [
    "Ansu V S",
    "Full-Stack Developer",
    "Creative Developer",
    "UI/UX Designer",
    "Aethra",
    "Aethra Digital Solutions",
    "Next.js",
    "Tailwind CSS",
    "Freelance Web Developer India",
  ],
  authors: [{ name: "Ansu V S", url: "https://github.com/thenameisanzu" }],
  creator: "Ansu V S",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Ansu V S — Developer & Designer",
    description:
      "Freelance full-stack developer and designer. Dreamer of Aethra Digital Solutions.",
    siteName: "Ansu V S",
    images: [
      {
        url: "/images/ansu.webp",
        width: 1200,
        height: 630,
        alt: "Ansu V S — Developer & Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ansu V S — Developer & Designer",
    description:
      "Freelance full-stack developer and designer. Dreamer of Aethra Digital Solutions.",
    images: ["/images/ansu.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 z-30 bg-noise opacity-50 mix-blend-multiply"
        />
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
