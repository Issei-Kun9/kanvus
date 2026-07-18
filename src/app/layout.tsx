import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Kanvus — AI-Powered Project Management",
    template: "%s | Kanvus",
  },
  description:
    "The AI workspace that thinks with your team. Kanban boards, real-time collaboration, and intelligent task prioritization — all in one beautiful app.",
  keywords: [
    "project management",
    "kanban board",
    "task management",
    "team collaboration",
    "AI assistant",
    "productivity",
    "workflow",
    "sprint planning",
    "agile",
    "remote work",
  ],
  authors: [{ name: "Kanvus" }],
  creator: "Kanvus",
  metadataBase: new URL("https://kanvus.dev"),
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kanvus.dev",
    siteName: "Kanvus",
    title: "Kanvus — AI-Powered Project Management",
    description:
      "The AI workspace that thinks with your team. Kanban boards, real-time collaboration, and intelligent task prioritization.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Kanvus - Project Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanvus — AI-Powered Project Management",
    description:
      "The AI workspace that thinks with your team. Kanban boards, real-time collaboration, and intelligent task prioritization.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased bg-[#060606] text-white">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
