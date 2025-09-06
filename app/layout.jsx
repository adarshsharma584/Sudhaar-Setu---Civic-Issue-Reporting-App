import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import DataInitializer from "@/components/data-initializer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sudhaar Setu - Civic Issue Reporting Platform",
  description: "Report and track civic issues in your city",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider>
            <DataInitializer />
            <div className="min-h-screen bg-background">
              <Navbar />
              <main>{children}</main>
              <Footer />
            </div>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
