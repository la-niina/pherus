import type { Metadata } from 'next'

import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { draftMode } from 'next/headers'
import { InitTheme } from '@/components/providers/Theme/InitTheme'
import { Providers } from '@/components/providers'
import { Header } from '@/components/Header/Component'
import { Footer } from '@/components/Footer/Component'
import './globals.css'
import { cn } from '@/environments/ui'
import { getServerSideURL } from '@/environments/getURL'
import { mergeOpenGraph } from '@/environments/mergeOpenGraph'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <div className={cn('flex-1')}>{children}</div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@pherus',
  },
}
