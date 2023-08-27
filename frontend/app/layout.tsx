import './globals.css'
import '@radix-ui/themes/styles.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Theme } from '@radix-ui/themes'
import ThemeProvider from '@/components/shared/theme-provider'
import PageHeader from '@/components/layout/header/page-header'
import Footer from '@/components/layout/footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WordBook',
  description: 'Easy vocabulary builder app',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Theme accentColor="iris" grayColor="sand" radius="large" scaling="95%">
            <div className="fixed h-screen w-full bg-gradient-to-br from-indigo-100 via-slate-100 to-cyan-100 dark:bg-gradient-to-br dark:from-gray-800 dark:to-slate-700" />
            <div className="relative z-10">
              <PageHeader />
              <main>{children}</main>
              <Footer />
            </div>
          </Theme>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
