import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import { StoreProvider } from "@/context/StoreContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/layout/CartDrawer";
import ToastContainer from "@/components/layout/Toast";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import MobileMenuDrawer from "@/components/layout/MobileMenuDrawer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "iSPACE BD | Premier Apple & Tech Gadget Store in Bangladesh",
  description:
    "Official Apple devices, flagship smartphones, MacBooks, smartwatches, and premium audio accessories in Bangladesh. 100% Genuine, 0% EMI up to 36 months.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('ispace_theme');
                  var root = document.documentElement;
                  if (saved === 'light') {
                    root.classList.add('light');
                    root.classList.remove('dark');
                    root.style.colorScheme = 'light';
                  } else if (saved === 'dark') {
                    root.classList.add('dark');
                    root.classList.remove('light');
                    root.style.colorScheme = 'dark';
                  } else {
                    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    if (prefersDark) {
                      root.classList.add('dark');
                      root.classList.remove('light');
                      root.style.colorScheme = 'dark';
                    } else {
                      root.classList.add('light');
                      root.classList.remove('dark');
                      root.style.colorScheme = 'light';
                    }
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#0c0e12] text-[#e8eaed] selection:bg-[#c45c5c] selection:text-white">
        <ThemeProvider>
          <StoreProvider>
            <Header />
            <main className="flex-1 pb-24 lg:pb-0">{children}</main>
            <Footer />
            <MobileBottomNav />
            <MobileMenuDrawer />
            <CartDrawer />
            <ToastContainer />
          </StoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
