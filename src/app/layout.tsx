import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kanvus - Project Management",
  description:
    "Project management with Kanban boards, team workspaces, and an AI assistant for task prioritization.",
  keywords: [
    "project management",
    "kanban",
    "task management",
    "team collaboration",
    "AI assistant",
  ],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Kanvus - Project Management",
    description:
      "Kanban boards, team workspaces, and AI-powered task prioritization.",
    type: "website",
    images: ["/og-image.svg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanvus - Project Management",
    description:
      "Kanban boards, team workspaces, and AI-powered task prioritization.",
    images: ["/og-image.svg"],
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
      <body className="min-h-screen antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
