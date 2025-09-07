import './globals.css'
import { Analytics } from "@vercel/analytics/next"
export const metadata = {
  title: 'SailsMaps Blog',
  description: 'Construction Blog',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-mono bg-yellow-50 text-black">{children}<Analytics /></body>
    </html>
  )
} 