import './globals.css'
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: 'SheetSpread Blog',
  description: 'Google Sheets Automation, Salesforce Integration, and AI-Powered Data Reporting',
  icons: {
    icon: '/favicon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Spectral:wght@300;400;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-mono bg-yellow-50 text-black">{children}<Analytics /></body>
    </html>
  )
} 