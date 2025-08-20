import type { Metadata } from "next";
import localFont from "next/font/local";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./globals.css";
import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/nextjs";
import ConvexClerkProvider from "@/components/providers/ConvexClerkProvider";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Toaster } from "react-hot-toast";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Intervue - Your Interview Platform",
  description: "Your Interview Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-gray-900`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <SignedIn>
              <div className="flex min-h-screen flex-col">
                {/* Navbar with green accent */}
                <Navbar />

                {/* Main content */}
                <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-b from-white to-green-50">
                  <div className="mx-auto max-w-6xl rounded-2xl border border-green-200 bg-white shadow-sm p-6">
                    {children}
                  </div>
                </main>

                {/* Footer (optional) */}
                <footer className="bg-green-600 text-white py-4 text-center text-sm">
                  © {new Date().getFullYear()} InterVue· Built with ❤️
                </footer>
              </div>
            </SignedIn>

            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>

            {/* Toast notifications with green accent */}
            <Toaster
              toastOptions={{
                style: {
                  background: "#10B981", // Tailwind emerald-500
                  color: "white",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
